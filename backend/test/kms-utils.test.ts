import {KmsUtilsService} from "../src/modules/kms/kms-utils.service";
import {beforeEach, describe, expect, test} from "bun:test";

describe("Key derivation", () => {
    let kmsUtilsService: KmsUtilsService;

    beforeEach(() => {
        kmsUtilsService = new KmsUtilsService();
    });

    test("Valid key generation should return a valid CryptoKey", async () => {
        const key: CryptoKey = await kmsUtilsService.generateAesKey(
            "secret",
            "salt",
            true,
        );

        expect(key).toBeDefined();
        expect(key).toBeInstanceOf(CryptoKey);
        expect(key.type).toBe("secret");
        expect(key.algorithm.name).toBe("AES-GCM");
        expect(key.extractable).toBe(true);
        expect(key.usages).toContain("encrypt");
        expect(key.usages).toContain("decrypt");
        expect(key.usages).toContain("wrapKey");
        expect(key.usages).toContain("unwrapKey");
        const rawKey: ArrayBuffer = await crypto.subtle.exportKey("raw", key);
        expect(rawKey.byteLength).toBe(32); // AES-256 key length
    });

    test("Extraction should not be allowed for non-extractable keys", async () => {
        const key: CryptoKey = await kmsUtilsService.generateAesKey(
            "secret",
            "salt",
            false,
        );
        expect(key).toBeDefined();
        expect(key.extractable).toBe(false);
        expect(crypto.subtle.exportKey("raw", key)).rejects.toThrow(
            "The CryptoKey is nonextractable",
        );
    });

    test("Same key for same inputs", async () => {
        const key1: CryptoKey = await kmsUtilsService.generateAesKey(
            "secret",
            "salt",
            true,
        );
        const key2: CryptoKey = await kmsUtilsService.generateAesKey(
            "secret",
            "salt",
            true,
        );

        const rawKey1: ArrayBuffer = await crypto.subtle.exportKey("raw", key1);
        const rawKey2: ArrayBuffer = await crypto.subtle.exportKey("raw", key2);

        expect(new Uint8Array(rawKey1)).toEqual(new Uint8Array(rawKey2));
    });

    test("Different keys for different inputs", async () => {
        const key1: CryptoKey = await kmsUtilsService.generateAesKey(
            "secret1",
            "salt1",
            true,
        );
        const key2: CryptoKey = await kmsUtilsService.generateAesKey(
            "secret2",
            "salt2",
            true,
        );

        const rawKey1: ArrayBuffer = await crypto.subtle.exportKey("raw", key1);
        const rawKey2: ArrayBuffer = await crypto.subtle.exportKey("raw", key2);

        expect(new Uint8Array(rawKey1)).not.toEqual(new Uint8Array(rawKey2));
    });
});

describe("Key wrapping and unwrapping", () => {
    let kmsUtilsService: KmsUtilsService;
    let wrappingKey: CryptoKey;
    let aesKeyToWrap: CryptoKey;
    let ecdsaKeyToWrap: CryptoKeyPair;

    beforeEach(async () => {
        kmsUtilsService = new KmsUtilsService();
        wrappingKey = await kmsUtilsService.generateAesKey(
            "my-master-wrapping-secret",
            "wrapping-salt",
        );
        aesKeyToWrap = await kmsUtilsService.generateAesKey(
            "some-data-key-secret",
            "data-key-salt",
        );
        ecdsaKeyToWrap = await kmsUtilsService.generateRandomKeyPair();
    });

    test("should correctly wrap and unwrap a key (round-trip)", async () => {
        const wrappedKeyBuffer = await kmsUtilsService.wrapCryptoKey(
            aesKeyToWrap,
            wrappingKey,
        );
        expect(wrappedKeyBuffer).toBeInstanceOf(Buffer);
        expect(wrappedKeyBuffer.length).toBeGreaterThan(32);
        const unwrappedKey: CryptoKey = await kmsUtilsService.unwrapCryptoKey(
            wrappedKeyBuffer,
            wrappingKey,
            "AES-GCM",
        );
        const rawOriginalKey: ArrayBuffer = await crypto.subtle.exportKey(
            "raw",
            aesKeyToWrap,
        );
        const rawUnwrappedKey: ArrayBuffer = await crypto.subtle.exportKey(
            "raw",
            unwrappedKey,
        );
        expect(new Uint8Array(rawUnwrappedKey)).toEqual(
            new Uint8Array(rawOriginalKey),
        );
    });

    test("should fail to unwrap with the wrong wrapping key", async () => {
        const wrongWrappingKey: CryptoKey =
            await kmsUtilsService.generateAesKey("wrong-secret", "wrong-salt");
        const wrappedKeyBuffer: Buffer = await kmsUtilsService.wrapCryptoKey(
            aesKeyToWrap,
            wrappingKey,
        );
        expect(
            kmsUtilsService.unwrapCryptoKey(
                wrappedKeyBuffer,
                wrongWrappingKey,
                "AES-GCM",
            ),
        ).rejects.toThrow();
    });

    test("should correctly wrap and unwrap an ECDSA key (round-trip)", async () => {
        const wrappedKeyBuffer: Buffer = await kmsUtilsService.wrapCryptoKey(
            ecdsaKeyToWrap.privateKey,
            wrappingKey,
        );

        expect(wrappedKeyBuffer).toBeInstanceOf(Buffer);
        expect(wrappedKeyBuffer.length).toBeGreaterThan(0);

        const unwrappedKey = await kmsUtilsService.unwrapCryptoKey(
            wrappedKeyBuffer,
            wrappingKey,
            "ECDSA",
        );

        expect(unwrappedKey).toBeInstanceOf(CryptoKey);
        expect(unwrappedKey.type).toBe("private");
        expect(unwrappedKey.algorithm.name).toBe("ECDSA");
        expect((unwrappedKey.algorithm as EcKeyAlgorithm).namedCurve).toBe(
            "p-521",
        );
        expect(unwrappedKey.usages).toContain("sign");
        expect(unwrappedKey.usages).not.toContain("verify");
    });

    test("unwrapped ECDSA key should be able to sign and verify", async () => {
        const wrappedKeyBuffer = await kmsUtilsService.wrapCryptoKey(
            ecdsaKeyToWrap.privateKey,
            wrappingKey,
        );
        const unwrappedPrivateKey = await kmsUtilsService.unwrapCryptoKey(
            wrappedKeyBuffer,
            wrappingKey,
            "ECDSA",
        );

        const data = new TextEncoder().encode("test data");
        const signature = await crypto.subtle.sign(
            {name: "ECDSA", hash: {name: "SHA-512"}},
            unwrappedPrivateKey,
            data,
        );

        const isValid = await crypto.subtle.verify(
            {name: "ECDSA", hash: {name: "SHA-512"}},
            ecdsaKeyToWrap.publicKey,
            signature,
            data,
        );

        expect(isValid).toBe(true);
    });

    test("should fail to unwrap ECDSA key with wrong algorithm parameter", async () => {
        const wrappedKeyBuffer = await kmsUtilsService.wrapCryptoKey(
            ecdsaKeyToWrap.privateKey,
            wrappingKey,
        );

        expect(
            kmsUtilsService.unwrapCryptoKey(
                wrappedKeyBuffer,
                wrappingKey,
                "AES-GCM",
            ),
        ).rejects.toThrow();
    });

    test("should fail to unwrap ECDSA key with wrong wrapping key", async () => {
        const wrongWrappingKey = await kmsUtilsService.generateAesKey(
            "wrong-secret",
            "wrong-salt",
        );
        const wrappedKeyBuffer = await kmsUtilsService.wrapCryptoKey(
            ecdsaKeyToWrap.privateKey,
            wrappingKey,
        );

        expect(
            kmsUtilsService.unwrapCryptoKey(
                wrappedKeyBuffer,
                wrongWrappingKey,
                "ECDSA",
            ),
        ).rejects.toThrow();
    });
});
