import {KmsUtilsService} from "../../../src/modules/kms/kms-utils.service";
import {beforeAll, describe, expect, test} from "bun:test";
import crypto from "crypto";

describe("generateAesKey (PBKDF2 Key Derivation)", () => {
    let kmsUtilsService: KmsUtilsService;
    const salt: string = "super-long-salt";

    beforeAll(() => {
        kmsUtilsService = new KmsUtilsService();
    });

    test("should generate a valid and extractable AES-GCM CryptoKey", async () => {
        const key = await kmsUtilsService.generateAesKey("secret", salt, true); // extractable
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
        const key = await kmsUtilsService.generateAesKey("secret", salt, false); // non-extractable
        expect(key.extractable).toBe(false);
        expect(crypto.subtle.exportKey("raw", key)).rejects.toThrow();
    });

    test("should generate an extractable key by default", async () => {
        const key = await kmsUtilsService.generateAesKey("secret", salt);
        expect(key.extractable).toBe(true); // Le défaut est 'true'
    });

    test("should be deterministic and produce the same key for the same inputs", async () => {
        const key1 = await kmsUtilsService.generateAesKey("secret", salt, true);
        const key2 = await kmsUtilsService.generateAesKey("secret", salt, true);
        const rawKey1 = await crypto.subtle.exportKey("raw", key1);
        const rawKey2 = await crypto.subtle.exportKey("raw", key2);
        expect(new Uint8Array(rawKey1)).toEqual(new Uint8Array(rawKey2));
    });

    test("should produce different keys for different secrets or salts", async () => {
        const key1 = await kmsUtilsService.generateAesKey(
            "secret1",
            salt,
            true,
        );
        const key2 = await kmsUtilsService.generateAesKey(
            "secret2",
            salt,
            true,
        );
        const key3 = await kmsUtilsService.generateAesKey(
            "secret",
            salt + "1",
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
