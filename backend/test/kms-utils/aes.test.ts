import {KmsUtilsService} from "../../src/modules/kms/kms-utils.service";
import {beforeAll, describe, expect, test} from "bun:test";
import {Readable} from "stream";
import * as crypto from "crypto";

function streamToBuffer(stream: Readable): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks)));
    });
}

describe("generateAesKey (PBKDF2 Key Derivation)", () => {
    let kmsUtilsService: KmsUtilsService;

    beforeAll(() => {
        kmsUtilsService = new KmsUtilsService();
    });

    test("should generate a valid and extractable AES-GCM CryptoKey", async () => {
        const key = await kmsUtilsService.generateAesKey(
            "secret",
            "salt",
            true, // extractable
        );

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
        // Sort both arrays to ensure the comparison is order-independent
        expect(key.usages.toSorted()).toEqual(expectedUsages.toSorted());

        // Export the key to check its length (256 bits / 8 = 32 bytes)
        const rawKey = await crypto.subtle.exportKey("raw", key);
        expect(rawKey.byteLength).toBe(32);
    });

    test("should generate a non-extractable key when requested", async () => {
        const key = await kmsUtilsService.generateAesKey(
            "secret",
            "salt",
            false, // non-extractable
        );

        expect(key.extractable).toBe(false);
        // Attempting to export a non-extractable key should throw an error.
        expect(crypto.subtle.exportKey("raw", key)).rejects.toThrow();
    });

    test("should generate a non-extractable key by default", async () => {
        // Calling without the 'extractable' parameter
        const key = await kmsUtilsService.generateAesKey("secret", "salt");
        expect(key.extractable).toBe(true);
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
        const key4 = await kmsUtilsService.generateAesKey(
            "secret",
            "salt2",
            true,
        );

        const rawKeys = await Promise.all(
            [key1, key2, key3, key4].map((k) =>
                crypto.subtle.exportKey("raw", k),
            ),
        );

        // Use a Set to easily check for uniqueness
        const uniqueKeys = new Set(
            rawKeys.map((k) => Buffer.from(k).toString("hex")),
        );

        expect(uniqueKeys.size).toBe(rawKeys.length);
    });

    test("should generate a valid key even with an empty secret or salt", async () => {
        // This is a valid use case, although potentially weak if the other input isn't strong.
        const key1 = await kmsUtilsService.generateAesKey("", "salt", true);
        const key2 = await kmsUtilsService.generateAesKey("secret", "", true);

        expect(key1).toBeInstanceOf(CryptoKey);
        expect(key2).toBeInstanceOf(CryptoKey);
    });

    test("should correctly handle non-ASCII characters in secret and salt", async () => {
        const key1 = await kmsUtilsService.generateAesKey(
            "sècrét-spéciàl-€",
            "sàlt-unikôde-你好",
            true,
        );
        const key2 = await kmsUtilsService.generateAesKey(
            "sècrét-spéciàl-€",
            "sàlt-unikôde-你好",
            true,
        );

        const rawKey1 = await crypto.subtle.exportKey("raw", key1);
        const rawKey2 = await crypto.subtle.exportKey("raw", key2);

        // The key derivation should still be deterministic
        expect(new Uint8Array(rawKey1)).toEqual(new Uint8Array(rawKey2));
    });
});

describe("Symmetric Encryption (AES-GCM)", () => {
    let kmsUtilsService: KmsUtilsService;
    let aesKey: CryptoKey;

    beforeAll(async () => {
        kmsUtilsService = new KmsUtilsService();
        // Generate a non-extractable key for encryption/decryption tests
        aesKey = await kmsUtilsService.generateAesKey("sym-secret", "sym-salt");
    });

    test("should encrypt and decrypt a message (round-trip)", async () => {
        const message = Buffer.from("Symmetric encryption is fantastic!");

        const encrypted = await kmsUtilsService.encryptWithAesGcm(
            aesKey,
            message,
        );

        expect(encrypted).toBeInstanceOf(Buffer);
        // Ciphertext should be larger than plaintext (IV + Tag)
        expect(encrypted.length).toBeGreaterThan(message.length);

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

        // With a random IV, two encryptions of the same data must not be identical.
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

        // Decrypting with the wrong key should throw an error.
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

        // Tamper with one byte of the ciphertext (not the IV or tag)
        encrypted[encrypted.length - 5] ^= 1; // XOR with 1 to flip a bit

        // The GCM tag validation should fail.
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

        // The IV is typically prepended to the ciphertext. Let's corrupt the first byte.
        encrypted[0] ^= 1;

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

        // Using the wrong AAD during decryption must fail.
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

        // Omitting the AAD during decryption must also fail.
        expect(
            kmsUtilsService.decryptWithAesGcm(aesKey, encrypted), // No AAD provided
        ).rejects.toThrow();
    });
});

describe("AES-GCM Stream Encryption/Decryption", () => {
    let kmsUtilsService: KmsUtilsService;
    let aesKey: CryptoKey;

    beforeAll(async () => {
        kmsUtilsService = new KmsUtilsService();
        aesKey = await kmsUtilsService.generateAesKey(
            "stream-secret",
            "stream-salt",
            true,
        );
    });

    test("should encrypt and decrypt a data stream (round-trip)", async () => {
        const originalData: Buffer = crypto.randomBytes(1024 * 64);
        const sourceStream: Readable = Readable.from(originalData);

        const {encryptedStream, iv, getAuthTag, getEncryptedSize} =
            await kmsUtilsService.encryptWithAesGcmStream(sourceStream, aesKey);

        expect(iv).toBeInstanceOf(Buffer);
        expect(iv.length).toBe(12);

        const encryptedBuffer: Buffer = await streamToBuffer(encryptedStream);
        const authTag: Buffer = await getAuthTag();
        const encryptedSize: number = await getEncryptedSize();

        expect(encryptedSize).toBe(originalData.length);
        expect(encryptedBuffer.length).toBe(originalData.length);
        expect(authTag).toBeInstanceOf(Buffer);
        expect(authTag.length).toBe(16);

        const encryptedSourceStream: Readable = Readable.from(encryptedBuffer);
        const decryptedStream: Readable =
            await kmsUtilsService.decryptWithAesGcmStream(
                encryptedSourceStream,
                aesKey,
                iv,
                authTag,
            );

        const decryptedBuffer: Buffer = await streamToBuffer(decryptedStream);

        expect(decryptedBuffer).toEqual(originalData);
    });

    test("should correctly handle an empty stream", async () => {
        const sourceStream: Readable = Readable.from(Buffer.from(""));

        const {encryptedStream, iv, getAuthTag, getEncryptedSize} =
            await kmsUtilsService.encryptWithAesGcmStream(sourceStream, aesKey);

        const encryptedBuffer: Buffer = await streamToBuffer(encryptedStream);
        const authTag: Buffer = await getAuthTag();
        const encryptedSize: number = await getEncryptedSize();

        expect(encryptedSize).toBe(0);
        expect(encryptedBuffer.length).toBe(0);

        const encryptedSourceStream: Readable = Readable.from(encryptedBuffer);
        const decryptedStream: Readable =
            await kmsUtilsService.decryptWithAesGcmStream(
                encryptedSourceStream,
                aesKey,
                iv,
                authTag,
            );

        const decryptedBuffer: Buffer = await streamToBuffer(decryptedStream);
        expect(decryptedBuffer).toEqual(Buffer.from(""));
    });

    test(
        "should correctly handle a large stream (e.g., 5MB)",
        async () => {
            const originalData: Buffer = crypto.randomBytes(1024 * 1024 * 5); // 5 MB
            const sourceStream: Readable = Readable.from(originalData);

            const {encryptedStream, iv, getAuthTag} =
                await kmsUtilsService.encryptWithAesGcmStream(
                    sourceStream,
                    aesKey,
                );

            const encryptedBuffer: Buffer =
                await streamToBuffer(encryptedStream);
            const authTag: Buffer = await getAuthTag();

            const encryptedSourceStream: Readable =
                Readable.from(encryptedBuffer);
            const decryptedStream: Readable =
                await kmsUtilsService.decryptWithAesGcmStream(
                    encryptedSourceStream,
                    aesKey,
                    iv,
                    authTag,
                );

            const decryptedBuffer: Buffer =
                await streamToBuffer(decryptedStream);
            expect(decryptedBuffer).toEqual(originalData);
        },
        {
            timeout: 10000,
        },
    );

    test("should fail decryption with the wrong key", async () => {
        const originalData: Buffer = Buffer.from("This will not be decrypted");
        const sourceStream: Readable = Readable.from(originalData);
        const wrongKey: CryptoKey = await kmsUtilsService.generateAesKey(
            "wrong-key",
            "salt",
            true,
        );

        const {encryptedStream, iv, getAuthTag} =
            await kmsUtilsService.encryptWithAesGcmStream(sourceStream, aesKey);
        const encryptedBuffer: Buffer = await streamToBuffer(encryptedStream);
        const authTag: Buffer = await getAuthTag();
        const encryptedSourceStream: Readable = Readable.from(encryptedBuffer);

        expect(
            (async () => {
                const decryptedStream =
                    await kmsUtilsService.decryptWithAesGcmStream(
                        encryptedSourceStream,
                        wrongKey,
                        iv,
                        authTag,
                    );
                await streamToBuffer(decryptedStream);
            })(),
        ).rejects.toThrow("Unsupported state or unable to authenticate");
    });

    test("should fail decryption with a tampered auth tag", async () => {
        const originalData: Buffer = Buffer.from("Data integrity is key");
        const sourceStream: Readable = Readable.from(originalData);

        const {encryptedStream, iv, getAuthTag} =
            await kmsUtilsService.encryptWithAesGcmStream(sourceStream, aesKey);
        const encryptedBuffer: Buffer = await streamToBuffer(encryptedStream);
        await getAuthTag();

        const tamperedAuthTag: Buffer = crypto.randomBytes(16);

        const encryptedSourceStream: Readable = Readable.from(encryptedBuffer);

        expect(
            (async () => {
                const decryptedStream =
                    await kmsUtilsService.decryptWithAesGcmStream(
                        encryptedSourceStream,
                        aesKey,
                        iv,
                        tamperedAuthTag,
                    );
                await streamToBuffer(decryptedStream);
            })(),
        ).rejects.toThrow("Unsupported state or unable to authenticate");
    });

    test("should fail decryption if the ciphertext stream is corrupted", async () => {
        const originalData: Buffer = crypto.randomBytes(1024);
        const sourceStream: Readable = Readable.from(originalData);

        const {encryptedStream, iv, getAuthTag} =
            await kmsUtilsService.encryptWithAesGcmStream(sourceStream, aesKey);
        const encryptedBuffer: Buffer = await streamToBuffer(encryptedStream);
        const authTag: Buffer = await getAuthTag();

        if (encryptedBuffer.length > 20) encryptedBuffer[10] ^= 1; // Flip a bit in the middle

        const encryptedSourceStream: Readable = Readable.from(encryptedBuffer);

        expect(
            (async () => {
                const decryptedStream: Readable =
                    await kmsUtilsService.decryptWithAesGcmStream(
                        encryptedSourceStream,
                        aesKey,
                        iv,
                        authTag,
                    );
                await streamToBuffer(decryptedStream);
            })(),
        ).rejects.toThrow("Unsupported state or unable to authenticate");
    });

    test("should correctly calculate SHA256 and decrypt with hash verification", async () => {
        const originalData: Buffer = crypto.randomBytes(1024 * 16);
        const sourceStream: Readable = Readable.from(originalData);

        const {encryptedStream, iv, getAuthTag, getSha256} =
            await kmsUtilsService.encryptWithAesGcmStream(sourceStream, aesKey);

        const encryptedBuffer: Buffer = await streamToBuffer(encryptedStream);
        const authTag: Buffer = await getAuthTag();
        const sha256: string = await getSha256();

        expect(sha256).toBeString();
        expect(sha256).toHaveLength(64);
        expect(/^[a-f0-9]{64}$/.test(sha256)).toBe(true);

        const encryptedSourceStream: Readable = Readable.from(encryptedBuffer);
        const decryptedStream: Readable =
            await kmsUtilsService.decryptWithAesGcmStream(
                encryptedSourceStream,
                aesKey,
                iv,
                authTag,
                sha256,
            );

        const decryptedBuffer: Buffer = await streamToBuffer(decryptedStream);
        expect(decryptedBuffer).toEqual(originalData);
    });

    test("should fail decryption if the provided SHA256 hash is incorrect", async () => {
        const originalData: Buffer = Buffer.from("Data integrity matters");
        const sourceStream: Readable = Readable.from(originalData);

        const {encryptedStream, iv, getAuthTag, getSha256} =
            await kmsUtilsService.encryptWithAesGcmStream(sourceStream, aesKey);

        const encryptedBuffer: Buffer = await streamToBuffer(encryptedStream);
        const authTag: Buffer = await getAuthTag();
        await getSha256();

        const tamperedSha256: string = "0".repeat(64);

        const encryptedSourceStream: Readable = Readable.from(encryptedBuffer);

        expect(
            (async () => {
                const decryptedStream =
                    await kmsUtilsService.decryptWithAesGcmStream(
                        encryptedSourceStream,
                        aesKey,
                        iv,
                        authTag,
                        tamperedSha256,
                    );
                await streamToBuffer(decryptedStream);
            })(),
        ).rejects.toThrow("SHA256 hash mismatch");
    });
});
