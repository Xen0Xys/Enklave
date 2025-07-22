import {beforeAll, describe, expect, test} from "bun:test";
import {KmsUtilsService} from "../../src/modules/kms/kms-utils.service";

describe("Key Wrapping", () => {
    let kmsUtilsService: KmsUtilsService;
    let wrappingKey: CryptoKey; // The master key used to wrap other keys
    let aesKeyToWrap: CryptoKey; // A secret key to be wrapped
    let x25519KeyPairToWrap: CryptoKeyPair; // An asymmetric key pair to be wrapped

    beforeAll(async () => {
        kmsUtilsService = new KmsUtilsService();

        // This is the main key, sometimes called a Key Encryption Key (KEK)
        wrappingKey = await kmsUtilsService.generateAesKey(
            "master-secret",
            "master-salt",
        );

        // This is a Data Encryption Key (DEK) that we want to protect
        aesKeyToWrap = await kmsUtilsService.generateAesKey(
            "data-key-secret",
            "data-key-salt",
        );

        x25519KeyPairToWrap = await kmsUtilsService.generateKeysX25519();
    });

    test("should wrap and unwrap an AES-GCM secret key (round-trip)", async () => {
        const wrappedKey = await kmsUtilsService.wrapCryptoKey(
            aesKeyToWrap,
            wrappingKey,
        );

        const unwrappedKey = await kmsUtilsService.unwrapCryptoKey(
            wrappedKey,
            wrappingKey,
            "AES-GCM",
        );

        // To verify they are the same, we export their raw material and compare
        const rawOriginal = await crypto.subtle.exportKey("raw", aesKeyToWrap);
        const rawUnwrapped = await crypto.subtle.exportKey("raw", unwrappedKey);

        expect(new Uint8Array(rawUnwrapped)).toEqual(
            new Uint8Array(rawOriginal),
        );
    });

    test("should wrap and unwrap an X25519 private key (round-trip)", async () => {
        const wrappedKey = await kmsUtilsService.wrapCryptoKey(
            x25519KeyPairToWrap.privateKey,
            wrappingKey,
        );

        const unwrappedKey = await kmsUtilsService.unwrapCryptoKey(
            wrappedKey,
            wrappingKey,
            "X25519", // Specify the algorithm of the key being unwrapped
        );

        expect(unwrappedKey).toBeInstanceOf(CryptoKey);
        expect(unwrappedKey.type).toBe("private");
        expect(unwrappedKey.algorithm.name).toBe("X25519");
    });

    // ✨ ADDED TEST: Ensure public keys can also be wrapped and unwrapped correctly.
    test("should wrap and unwrap an X25519 public key (round-trip)", async () => {
        const wrappedKey = await kmsUtilsService.wrapCryptoKey(
            x25519KeyPairToWrap.publicKey,
            wrappingKey,
            true,
        );

        const unwrappedKey = await kmsUtilsService.unwrapCryptoKey(
            wrappedKey,
            wrappingKey,
            "X25519_PUBLIC",
        );

        expect(unwrappedKey).toBeInstanceOf(CryptoKey);
        expect(unwrappedKey.type).toBe("public");
        expect(unwrappedKey.algorithm.name).toBe("X25519");
    });

    test("should fail to unwrap with an incorrect wrapping key", async () => {
        const wrongWrappingKey = await kmsUtilsService.generateAesKey(
            "wrong-key",
            "wrong-salt",
        );
        const wrappedKey = await kmsUtilsService.wrapCryptoKey(
            aesKeyToWrap,
            wrappingKey,
        );

        // Attempting to unwrap with the wrong key should be rejected
        expect(
            kmsUtilsService.unwrapCryptoKey(
                wrappedKey,
                wrongWrappingKey,
                "AES-GCM",
            ),
        ).rejects.toThrow();
    });

    test("should fail to unwrap with corrupted (tampered) data", async () => {
        const wrappedKey = await kmsUtilsService.wrapCryptoKey(
            aesKeyToWrap,
            wrappingKey,
        );

        // Tamper with the wrapped key data
        wrappedKey[0] ^= 1;

        // The underlying AES-GCM decryption of the key should fail
        expect(
            kmsUtilsService.unwrapCryptoKey(wrappedKey, wrappingKey, "AES-GCM"),
        ).rejects.toThrow();
    });

    test("should fail to unwrap when specifying the wrong algorithm for the target key", async () => {
        // We wrap an AES key...
        const wrappedKey = await kmsUtilsService.wrapCryptoKey(
            aesKeyToWrap,
            wrappingKey,
        );

        // ...but try to unwrap it as an X25519 key. This should fail.
        expect(
            kmsUtilsService.unwrapCryptoKey(wrappedKey, wrappingKey, "X25519"),
        ).rejects.toThrow();
    });

    test("should fail to wrap a non-extractable key", async () => {
        const nonExtractableKey = await kmsUtilsService.generateAesKey(
            "secret",
            "salt",
            false, // Key material cannot be read
        );

        // Wrapping requires exporting the key, so it must fail for non-extractable keys.
        expect(
            kmsUtilsService.wrapCryptoKey(nonExtractableKey, wrappingKey),
        ).rejects.toThrow();
    });

    test("should fail to wrap if the wrapping key lacks 'wrapKey' usage", async () => {
        // Create a key that is identical but doesn't have the 'wrapKey' permission
        const keyData = await crypto.subtle.exportKey("raw", wrappingKey);
        const keyWithoutWrapUsage = await crypto.subtle.importKey(
            "raw",
            keyData,
            {name: "AES-GCM"},
            true,
            ["unwrapKey"], // Missing 'wrapKey'
        );

        expect(
            kmsUtilsService.wrapCryptoKey(aesKeyToWrap, keyWithoutWrapUsage),
        ).rejects.toThrow();
    });

    test("should fail to unwrap if the wrapping key lacks 'unwrapKey' usage", async () => {
        // Create a key that is identical but doesn't have the 'unwrapKey' permission
        const keyData = await crypto.subtle.exportKey("raw", wrappingKey);
        const keyWithoutUnwrapUsage = await crypto.subtle.importKey(
            "raw",
            keyData,
            {name: "AES-GCM"},
            true,
            ["wrapKey"], // Missing 'unwrapKey'
        );

        const wrappedKey = await kmsUtilsService.wrapCryptoKey(
            aesKeyToWrap,
            wrappingKey,
        );

        expect(
            kmsUtilsService.unwrapCryptoKey(
                wrappedKey,
                keyWithoutUnwrapUsage,
                "AES-GCM",
            ),
        ).rejects.toThrow();
    });
});
