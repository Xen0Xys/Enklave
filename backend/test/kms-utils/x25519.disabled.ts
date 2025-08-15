import {beforeAll, describe, expect, test} from "bun:test";
import {SecurityUtilsService} from "../../src/modules/security/security-utils.service";

describe("generateKeysX25519 (Génération de paire de clés ECDH)", () => {
    let kmsUtilsService: SecurityUtilsService;

    beforeAll(async () => {
        kmsUtilsService = new SecurityUtilsService();
    });

    test("devrait générer une CryptoKeyPair valide pour X25519", async () => {
        const keyPair = await kmsUtilsService.generateKeysX25519();
        expect(keyPair).toBeDefined();
        expect(keyPair.publicKey).toBeInstanceOf(CryptoKey);
        expect(keyPair.privateKey).toBeInstanceOf(CryptoKey);
    });

    test("devrait générer des clés avec les propriétés attendues", async () => {
        const {publicKey, privateKey} =
            await kmsUtilsService.generateKeysX25519();

        expect(publicKey.type).toBe("public");
        expect(publicKey.algorithm.name).toBe("X25519");
        expect(publicKey.extractable).toBe(true);
        expect(publicKey.usages).toEqual([]);

        expect(privateKey.type).toBe("private");
        expect(privateKey.algorithm.name).toBe("X25519");
        expect(privateKey.extractable).toBe(true);
        expect(privateKey.usages).toEqual(["deriveKey", "deriveBits"]);
    });

    test("devrait générer des paires de clés uniques à chaque appel", async () => {
        const keyPair1 = await kmsUtilsService.generateKeysX25519();
        const keyPair2 = await kmsUtilsService.generateKeysX25519();
        const pk1Raw = await crypto.subtle.exportKey("raw", keyPair1.publicKey);
        const pk2Raw = await crypto.subtle.exportKey("raw", keyPair2.publicKey);
        expect(new Uint8Array(pk1Raw)).not.toEqual(new Uint8Array(pk2Raw));
    });
});

describe("Chiffrement asymétrique (ECDH-ES + AES-GCM)", () => {
    let kmsUtilsService: SecurityUtilsService;
    let recipientKeyPair: CryptoKeyPair;
    let anotherKeyPair: CryptoKeyPair;

    beforeAll(async () => {
        kmsUtilsService = new SecurityUtilsService();
        recipientKeyPair = await kmsUtilsService.generateKeysX25519();
        anotherKeyPair = await kmsUtilsService.generateKeysX25519();
    });

    test("devrait chiffrer et déchiffrer un message (round-trip)", async () => {
        const message = Buffer.from("Le chiffrement asymétrique est puissant!");
        const encrypted = await kmsUtilsService.encryptWithX25519(
            recipientKeyPair.publicKey,
            message,
        );
        expect(encrypted).toBeInstanceOf(Buffer);
        const decrypted = await kmsUtilsService.decryptWithX25519(
            recipientKeyPair.privateKey,
            encrypted,
        );
        expect(Buffer.from(decrypted)).toEqual(message);
    });

    test("devrait gérer un message vide", async () => {
        const emptyMessage = Buffer.from("");
        const encrypted = await kmsUtilsService.encryptWithX25519(
            recipientKeyPair.publicKey,
            emptyMessage,
        );
        const decrypted = await kmsUtilsService.decryptWithX25519(
            recipientKeyPair.privateKey,
            encrypted,
        );
        expect(Buffer.from(decrypted)).toEqual(emptyMessage);
    });

    test("le payload chiffré devrait avoir une structure attendue", async () => {
        const encrypted = await kmsUtilsService.encryptWithX25519(
            recipientKeyPair.publicKey,
            Buffer.from("data"),
        );
        const ephemeralPkSize = 32;
        const ivSize = 12;
        expect(encrypted.length).toBeGreaterThan(ephemeralPkSize + ivSize);
    });

    test("devrait échouer le déchiffrement avec une mauvaise clé privée", async () => {
        const message = Buffer.from("Message secret");
        const encrypted = await kmsUtilsService.encryptWithX25519(
            recipientKeyPair.publicKey,
            message,
        );
        expect(
            kmsUtilsService.decryptWithX25519(
                anotherKeyPair.privateKey,
                encrypted,
            ),
        ).rejects.toThrow();
    });

    test("devrait échouer si la clé publique éphémère est corrompue dans le payload", async () => {
        const encrypted = await kmsUtilsService.encryptWithX25519(
            recipientKeyPair.publicKey,
            Buffer.from("data"),
        );
        encrypted[10] ^= 1;
        expect(
            kmsUtilsService.decryptWithX25519(
                recipientKeyPair.privateKey,
                encrypted,
            ),
        ).rejects.toThrow();
    });

    test("devrait échouer si le ciphertext est corrompu dans le payload", async () => {
        const encrypted = await kmsUtilsService.encryptWithX25519(
            recipientKeyPair.publicKey,
            Buffer.from("data"),
        );
        encrypted[encrypted.length - 1] ^= 1;
        expect(
            kmsUtilsService.decryptWithX25519(
                recipientKeyPair.privateKey,
                encrypted,
            ),
        ).rejects.toThrow();
    });
});
