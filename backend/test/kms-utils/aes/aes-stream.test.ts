import {SecurityUtilsService} from "../../../src/modules/security/security-utils.service";
import {beforeAll, describe, expect, test} from "bun:test";
// @ts-ignore
import wycheproofVectors from "./aes.test.json";
import * as crypto from "crypto";
import {Readable} from "stream";

// Helper function to consume a stream and return its content as a buffer
function streamToBuffer(stream: Readable): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks)));
    });
}

describe("AES-GCM Stream Encryption/Decryption", () => {
    let kmsUtilsService: SecurityUtilsService;
    let aesKey: CryptoKey;

    beforeAll(async () => {
        kmsUtilsService = new SecurityUtilsService();
        aesKey = await kmsUtilsService.generateAesKey(
            "stream-secret",
            "stream-salt",
            true,
        );
    });

    test("should encrypt and decrypt a data stream (round-trip)", async () => {
        const originalData = crypto.randomBytes(1024 * 64); // 64 KB
        const sourceStream = Readable.from(originalData);

        const {encryptedStream, iv, getAuthTag} =
            await kmsUtilsService.encryptWithAesGcmStream(sourceStream, aesKey);

        const encryptedBuffer = await streamToBuffer(encryptedStream);
        const authTag = await getAuthTag();

        const encryptedSourceStream = Readable.from(encryptedBuffer);
        const decryptedStream = await kmsUtilsService.decryptWithAesGcmStream(
            encryptedSourceStream,
            aesKey,
            iv,
            authTag,
        );

        const decryptedBuffer = await streamToBuffer(decryptedStream);
        expect(decryptedBuffer).toEqual(originalData);
    });

    test("should correctly handle an empty stream", async () => {
        const sourceStream = Readable.from(Buffer.from(""));
        const {encryptedStream, iv, getAuthTag} =
            await kmsUtilsService.encryptWithAesGcmStream(sourceStream, aesKey);

        const encryptedBuffer = await streamToBuffer(encryptedStream);
        const authTag = await getAuthTag();

        expect(encryptedBuffer.length).toBe(0);

        const encryptedSourceStream = Readable.from(encryptedBuffer);
        const decryptedStream = await kmsUtilsService.decryptWithAesGcmStream(
            encryptedSourceStream,
            aesKey,
            iv,
            authTag,
        );

        const decryptedBuffer = await streamToBuffer(decryptedStream);
        expect(decryptedBuffer).toEqual(Buffer.from(""));
    });

    test(
        "should correctly handle a large stream (5MB)",
        async () => {
            const originalData = crypto.randomBytes(1024 * 1024 * 5); // 5 MB
            const sourceStream = Readable.from(originalData);

            const {encryptedStream, iv, getAuthTag} =
                await kmsUtilsService.encryptWithAesGcmStream(
                    sourceStream,
                    aesKey,
                );

            const encryptedBuffer = await streamToBuffer(encryptedStream);
            const authTag = await getAuthTag();

            const encryptedSourceStream = Readable.from(encryptedBuffer);
            const decryptedStream =
                await kmsUtilsService.decryptWithAesGcmStream(
                    encryptedSourceStream,
                    aesKey,
                    iv,
                    authTag,
                );

            const decryptedBuffer = await streamToBuffer(decryptedStream);
            expect(decryptedBuffer).toEqual(originalData);
        },
        {timeout: 15000},
    ); // Increase timeout for large file processing

    test("should fail decryption with the wrong key", async () => {
        const originalData = Buffer.from("This will not be decrypted");
        const sourceStream = Readable.from(originalData);
        const wrongKey = await kmsUtilsService.generateAesKey(
            "wrong-key-for-stream",
            "super-long-salt",
            true,
        );

        const {encryptedStream, iv, getAuthTag} =
            await kmsUtilsService.encryptWithAesGcmStream(sourceStream, aesKey);
        const encryptedBuffer = await streamToBuffer(encryptedStream);
        const authTag = await getAuthTag();

        const encryptedSourceStream = Readable.from(encryptedBuffer);

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
        ).rejects.toThrow(/Unsupported state or unable to authenticate/);
    });

    test("should fail decryption with a tampered auth tag", async () => {
        const originalData = Buffer.from("Data integrity is key");
        const sourceStream = Readable.from(originalData);

        const {encryptedStream, iv, getAuthTag} =
            await kmsUtilsService.encryptWithAesGcmStream(sourceStream, aesKey);
        const encryptedBuffer = await streamToBuffer(encryptedStream);
        await getAuthTag(); // Ensure original tag is generated

        const tamperedAuthTag = crypto.randomBytes(16); // Use a completely wrong tag
        const encryptedSourceStream = Readable.from(encryptedBuffer);

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
        ).rejects.toThrow(/Unsupported state or unable to authenticate/);
    });

    test("should correctly calculate SHA256 and decrypt with hash verification", async () => {
        const originalData = crypto.randomBytes(1024 * 16);
        const sourceStream = Readable.from(originalData);

        const {encryptedStream, iv, getAuthTag, getSha256} =
            await kmsUtilsService.encryptWithAesGcmStream(sourceStream, aesKey);

        const encryptedBuffer = await streamToBuffer(encryptedStream);
        const authTag = await getAuthTag();
        const sha256 = await getSha256();

        expect(sha256).toBeString();
        expect(sha256).toHaveLength(64);

        const encryptedSourceStream = Readable.from(encryptedBuffer);
        const decryptedStream = await kmsUtilsService.decryptWithAesGcmStream(
            encryptedSourceStream,
            aesKey,
            iv,
            authTag,
            sha256,
        );

        const decryptedBuffer = await streamToBuffer(decryptedStream);
        expect(decryptedBuffer).toEqual(originalData);
    });

    test("should fail decryption if the provided SHA256 hash is incorrect", async () => {
        const originalData = Buffer.from("Data integrity matters");
        const sourceStream = Readable.from(originalData);

        const {encryptedStream, iv, getAuthTag, getSha256} =
            await kmsUtilsService.encryptWithAesGcmStream(sourceStream, aesKey);
        const encryptedBuffer = await streamToBuffer(encryptedStream);
        const authTag = await getAuthTag();
        await getSha256();

        const tamperedSha256 = "0".repeat(64);
        const encryptedSourceStream = Readable.from(encryptedBuffer);

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

/**
 * Test suite for Wycheproof AES-GCM vectors in stream mode.
 * These tests verify the IV and tag size, as the implementation only supports 256-bit keys, 96-bit IVs, and 128-bit tags.
 */
describe("Wycheproof AES-GCM Stream Vectors", () => {
    let kmsUtilsService: SecurityUtilsService;

    beforeAll(() => {
        kmsUtilsService = new SecurityUtilsService();
    });

    wycheproofVectors.testGroups.forEach((group) => {
        const groupTitle = `Group tcId: ${group.tests[0].tcId}-${group.tests[group.tests.length - 1].tcId} (keySize: ${group.keySize}, ivSize: ${group.ivSize}, tagSize: ${group.tagSize})`;

        describe(groupTitle, () => {
            if (
                group.keySize !== 256 ||
                group.ivSize !== 96 ||
                group.type !== "AeadTest"
            ) {
                test.todo(
                    `Skipping group: Incompatible keySize (${group.keySize}) or ivSize (${group.ivSize}) for this implementation.`,
                );
                return;
            }

            group.tests.forEach((vector: any) => {
                if (group.tagSize !== 128) return;
                if (vector.aad.length > 0) return;

                const testName = `tcId: ${vector.tcId} - ${vector.comment || vector.result}`;

                test(testName, async () => {
                    const keyBuffer = Buffer.from(vector.key, "hex");
                    const ivBuffer = Buffer.from(vector.iv, "hex");
                    const msgBuffer = Buffer.from(vector.msg, "hex");
                    const ctBuffer = Buffer.from(vector.ct, "hex");
                    const tagBuffer = Buffer.from(vector.tag, "hex");

                    const cryptoKey = await crypto.subtle.importKey(
                        "raw",
                        keyBuffer,
                        {name: "AES-GCM", length: group.keySize},
                        true,
                        ["encrypt", "decrypt"],
                    );

                    const encryptedStream = Readable.from(ctBuffer);

                    if (
                        vector.result === "valid" ||
                        vector.result === "acceptable"
                    ) {
                        const decryptedStream =
                            await kmsUtilsService.decryptWithAesGcmStream(
                                encryptedStream,
                                cryptoKey,
                                ivBuffer,
                                tagBuffer,
                            );
                        const decryptedBuffer =
                            await streamToBuffer(decryptedStream);
                        expect(decryptedBuffer).toEqual(msgBuffer);
                    } else if (vector.result === "invalid") {
                        expect(
                            (async () => {
                                const decryptedStream =
                                    await kmsUtilsService.decryptWithAesGcmStream(
                                        encryptedStream,
                                        cryptoKey,
                                        ivBuffer,
                                        tagBuffer,
                                    );
                                await streamToBuffer(decryptedStream);
                            })(),
                        ).rejects.toThrow();
                    }
                });
            });
        });
    });
});
