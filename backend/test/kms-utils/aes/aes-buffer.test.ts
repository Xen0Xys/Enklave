import {KmsUtilsService} from "../../../src/modules/kms/kms-utils.service";
import {beforeAll, describe, expect, test} from "bun:test";
// @ts-ignore
import wycheproofVectors from "./aes.test.json";
import * as crypto from "crypto";

describe("generateAesKey (PBKDF2 Key Derivation)", () => {
    let kmsUtilsService: KmsUtilsService;

    beforeAll(() => {
        kmsUtilsService = new KmsUtilsService();
    });

    test("should generate a valid and extractable AES-GCM CryptoKey", async () => {
        const key = await kmsUtilsService.generateAesKey(
            "secret",
            "salt",
            true,
        ); // extractable
        expect(key).toBeInstanceOf(CryptoKey);
        expect(key.type).toBe("secret");
        expect(key.algorithm.name).toBe("AES-GCM");
        expect(key.extractable).toBe(true);
        const expectedUsages: KeyUsage[] = [
            "encrypt",
            "decrypt",
            "wrapKey",
            "unwrapKey",
        ];
        expect(key.usages.toSorted()).toEqual(expectedUsages.toSorted());
        const rawKey = await crypto.subtle.exportKey("raw", key);
        expect(rawKey.byteLength).toBe(32); // 256 bits
    });

    test("should generate a non-extractable key when requested", async () => {
        const key = await kmsUtilsService.generateAesKey(
            "secret",
            "salt",
            false,
        ); // non-extractable
        expect(key.extractable).toBe(false);
        expect(crypto.subtle.exportKey("raw", key)).rejects.toThrow();
    });

    test("should generate an extractable key by default", async () => {
        const key = await kmsUtilsService.generateAesKey("secret", "salt");
        expect(key.extractable).toBe(true); // Le défaut est 'true'
    });

    test("should be deterministic and produce the same key for the same inputs", async () => {
        const key1 = await kmsUtilsService.generateAesKey(
            "secret",
            "salt",
            true,
        );
        const key2 = await kmsUtilsService.generateAesKey(
            "secret",
            "salt",
            true,
        );
        const rawKey1 = await crypto.subtle.exportKey("raw", key1);
        const rawKey2 = await crypto.subtle.exportKey("raw", key2);
        expect(new Uint8Array(rawKey1)).toEqual(new Uint8Array(rawKey2));
    });

    test("should produce different keys for different secrets or salts", async () => {
        const key1 = await kmsUtilsService.generateAesKey(
            "secret1",
            "salt",
            true,
        );
        const key2 = await kmsUtilsService.generateAesKey(
            "secret2",
            "salt",
            true,
        );
        const key3 = await kmsUtilsService.generateAesKey(
            "secret",
            "salt1",
            true,
        );
        const rawKeys = await Promise.all(
            [key1, key2, key3].map((k) => crypto.subtle.exportKey("raw", k)),
        );
        const uniqueKeys = new Set(
            rawKeys.map((k) => Buffer.from(k).toString("hex")),
        );
        expect(uniqueKeys.size).toBe(rawKeys.length);
    });
});

describe("Symmetric Encryption (AES-GCM with Buffers)", () => {
    let kmsUtilsService: KmsUtilsService;
    let aesKey: CryptoKey;

    beforeAll(async () => {
        kmsUtilsService = new KmsUtilsService();
        aesKey = await kmsUtilsService.generateAesKey("sym-secret", "sym-salt");
    });

    test("should encrypt and decrypt a message (round-trip)", async () => {
        const message = Buffer.from("Symmetric encryption is fantastic!");
        const encrypted = await kmsUtilsService.encryptWithAesGcm(
            aesKey,
            message,
        );

        expect(encrypted).toBeInstanceOf(Buffer);
        expect(encrypted.length).toBeGreaterThan(message.length); // IV + Tag

        const decrypted = await kmsUtilsService.decryptWithAesGcm(
            aesKey,
            encrypted,
        );
        expect(Buffer.from(decrypted)).toEqual(message);
    });

    test("should correctly handle an empty message", async () => {
        const emptyMessage = Buffer.from("");
        const encrypted = await kmsUtilsService.encryptWithAesGcm(
            aesKey,
            emptyMessage,
        );
        const decrypted = await kmsUtilsService.decryptWithAesGcm(
            aesKey,
            encrypted,
        );
        expect(Buffer.from(decrypted)).toEqual(emptyMessage);
    });

    test("should produce different ciphertexts for the same message (IV uniqueness)", async () => {
        const message = Buffer.from("test message");
        const encrypted1 = await kmsUtilsService.encryptWithAesGcm(
            aesKey,
            message,
        );
        const encrypted2 = await kmsUtilsService.encryptWithAesGcm(
            aesKey,
            message,
        );
        expect(encrypted1).not.toEqual(encrypted2);
    });

    test("should fail decryption with the wrong key", async () => {
        const wrongKey = await kmsUtilsService.generateAesKey(
            "wrong-secret",
            "wrong-salt",
        );
        const message = Buffer.from("test");
        const encrypted = await kmsUtilsService.encryptWithAesGcm(
            aesKey,
            message,
        );
        expect(
            kmsUtilsService.decryptWithAesGcm(wrongKey, encrypted),
        ).rejects.toThrow();
    });

    test("should fail decryption if the ciphertext is corrupted", async () => {
        const message = Buffer.from("test");
        const encrypted = await kmsUtilsService.encryptWithAesGcm(
            aesKey,
            message,
        );
        encrypted[encrypted.length - 5] ^= 1; // Corrupt ciphertext
        expect(
            kmsUtilsService.decryptWithAesGcm(aesKey, encrypted),
        ).rejects.toThrow();
    });

    test("should fail decryption if the initialization vector (IV) is corrupted", async () => {
        const message = Buffer.from("test");
        const encrypted = await kmsUtilsService.encryptWithAesGcm(
            aesKey,
            message,
        );
        encrypted[0] ^= 1; // Corrupt IV
        expect(
            kmsUtilsService.decryptWithAesGcm(aesKey, encrypted),
        ).rejects.toThrow();
    });
});

describe("AES-GCM Encryption with Associated Data (AAD)", () => {
    let kmsUtilsService: KmsUtilsService;
    let aesKey: CryptoKey;

    beforeAll(async () => {
        kmsUtilsService = new KmsUtilsService();
        aesKey = await kmsUtilsService.generateAesKey("aad-secret", "aad-salt");
    });

    test("should successfully encrypt and decrypt with AAD", async () => {
        const message = Buffer.from("payload to be encrypted");
        const associatedData = Buffer.from("metadata-to-be-authenticated");

        const encrypted = await kmsUtilsService.encryptWithAesGcm(
            aesKey,
            message,
            associatedData,
        );
        const decrypted = await kmsUtilsService.decryptWithAesGcm(
            aesKey,
            encrypted,
            associatedData,
        );

        expect(Buffer.from(decrypted)).toEqual(message);
    });

    test("should fail decryption if AAD is tampered with", async () => {
        const message = Buffer.from("payload");
        const associatedData = Buffer.from("metadata");
        const tamperedAad = Buffer.from("tampered-metadata");
        const encrypted = await kmsUtilsService.encryptWithAesGcm(
            aesKey,
            message,
            associatedData,
        );

        expect(
            kmsUtilsService.decryptWithAesGcm(aesKey, encrypted, tamperedAad),
        ).rejects.toThrow();
    });

    test("should fail decryption if AAD is omitted when it was used for encryption", async () => {
        const message = Buffer.from("payload");
        const associatedData = Buffer.from("metadata");
        const encrypted = await kmsUtilsService.encryptWithAesGcm(
            aesKey,
            message,
            associatedData,
        );

        expect(
            kmsUtilsService.decryptWithAesGcm(aesKey, encrypted),
        ).rejects.toThrow();
    });
});

/**
 * Test suite for Wycheproof AES-GCM vectors in Buffer mode.
 * These tests verify the IV and tag size, as the implementation only supports 256-bit keys, 96-bit IVs, and 128-bit tags.
 */
describe("Wycheproof AES-GCM Buffer Vectors", () => {
    let kmsUtilsService: KmsUtilsService;

    beforeAll(() => {
        kmsUtilsService = new KmsUtilsService();
    });

    wycheproofVectors.testGroups.forEach((group) => {
        const groupTitle = `Group tcId: ${group.tests[0].tcId}-${group.tests[group.tests.length - 1].tcId} (keySize: ${group.keySize}, ivSize: ${group.ivSize}, tagSize: ${group.tagSize})`;

        describe(groupTitle, () => {
            if (group.ivSize !== 96 || group.type !== "AeadTest") {
                test.todo(
                    `Skipping group: ivSize is ${group.ivSize} (unsupported) or type is not AeadTest`,
                );
                return;
            }

            group.tests.forEach((vector: any) => {
                if (group.tagSize !== 128) return;

                const testName = `tcId: ${vector.tcId} - ${vector.comment || vector.result}`;

                test(testName, async () => {
                    const keyBuffer = Buffer.from(vector.key, "hex");
                    const ivBuffer = Buffer.from(vector.iv, "hex");
                    const aadBuffer = Buffer.from(vector.aad, "hex");
                    const msgBuffer = Buffer.from(vector.msg, "hex");
                    const ctBuffer = Buffer.from(vector.ct, "hex");
                    const tagBuffer = Buffer.from(vector.tag, "hex");

                    const cryptoKey = await crypto.subtle.importKey(
                        "raw",
                        keyBuffer,
                        {name: "AES-GCM"},
                        true,
                        ["encrypt", "decrypt"],
                    );

                    const ciphertextWithTag = Buffer.concat([
                        ctBuffer,
                        tagBuffer,
                    ]);
                    const encryptedForService = Buffer.concat([
                        ivBuffer,
                        ciphertextWithTag,
                    ]);

                    if (
                        vector.result === "valid" ||
                        vector.result === "acceptable"
                    ) {
                        const decrypted =
                            await kmsUtilsService.decryptWithAesGcm(
                                cryptoKey,
                                encryptedForService,
                                aadBuffer,
                            );
                        expect(Buffer.from(decrypted)).toEqual(msgBuffer);

                        const ourEncrypted =
                            await kmsUtilsService.encryptWithAesGcm(
                                cryptoKey,
                                msgBuffer,
                                aadBuffer,
                            );
                        const ourDecrypted =
                            await kmsUtilsService.decryptWithAesGcm(
                                cryptoKey,
                                ourEncrypted,
                                aadBuffer,
                            );
                        expect(Buffer.from(ourDecrypted)).toEqual(msgBuffer);
                    } else if (vector.result === "invalid") {
                        expect(
                            kmsUtilsService.decryptWithAesGcm(
                                cryptoKey,
                                encryptedForService,
                                aadBuffer,
                            ),
                        ).rejects.toThrow();
                    }
                });
            });
        });
    });
});
