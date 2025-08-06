import {Injectable} from "@nestjs/common";
import * as crypto from "crypto";
import {Readable} from "stream";

@Injectable()
export class KmsUtilsService {
    generateUuid(version: 4 | 7 = 7): string {
        if (version === 4) return crypto.randomUUID();
        else if (version === 7) return Bun.randomUUIDv7();
        else throw new Error("Unsupported UUID version");
    }

    randomBytes(length: number): Buffer {
        return crypto.randomBytes(length);
    }

    async hashPassword(data: Bun.StringOrBuffer): Promise<string> {
        return await Bun.password.hash(data, {
            algorithm: "argon2id",
            timeCost: 12,
        });
    }

    async verifyPassword(
        data: Bun.StringOrBuffer,
        hash: string,
    ): Promise<boolean> {
        return await Bun.password.verify(data, hash);
    }

    hash(data: string | Buffer): Buffer {
        const hash: crypto.Hash = crypto.createHash("sha256");
        hash.update(data);
        return hash.digest();
    }

    async generateKeysX25519(): Promise<CryptoKeyPair> {
        return (await crypto.subtle.generateKey(
            {
                name: "X25519",
            },
            true,
            ["deriveKey", "deriveBits"],
        )) as unknown as CryptoKeyPair;
    }

    async wrapCryptoKey(
        keyToWrap: CryptoKey,
        wrappingKey: CryptoKey,
        isPublicKey: boolean = false,
    ): Promise<Buffer> {
        const iv: Buffer = crypto.randomBytes(12);

        let format: "raw" | "pkcs8";
        switch (keyToWrap.algorithm.name) {
            case "AES-GCM":
                format = "raw";
                break;
            case "X25519":
                if (isPublicKey)
                    format = "raw"; // Public keys are wrapped as raw bytes
                else format = "pkcs8";
                break;
            default:
                throw new Error(
                    `Unsupported algorithm for wrapping: ${keyToWrap.algorithm.name}`,
                );
        }

        const wrappedKeyData: ArrayBuffer = await crypto.subtle.wrapKey(
            format,
            keyToWrap,
            wrappingKey,
            {
                name: "AES-GCM",
                iv,
            },
        );
        return Buffer.concat([iv, Buffer.from(wrappedKeyData)]);
    }

    async unwrapCryptoKey(
        wrappedKeyBuffer: Buffer,
        unwrappingKey: CryptoKey,
        wrappedKeyAlgorithm: "AES-GCM" | "X25519" | "X25519_PUBLIC",
    ): Promise<CryptoKey> {
        const iv: Buffer = wrappedKeyBuffer.subarray(0, 12);
        const wrappedKeyData: Buffer = wrappedKeyBuffer.subarray(12);

        let keyAlgorithm:
            | AlgorithmIdentifier
            | RsaHashedImportParams
            | EcKeyImportParams
            | HmacImportParams
            | AesKeyAlgorithm;
        let keyUsages: KeyUsage[];
        let format: "raw" | "pkcs8";

        switch (wrappedKeyAlgorithm) {
            case "AES-GCM":
                format = "raw"; // Symmetric keys use "raw"
                keyAlgorithm = {name: "AES-GCM", length: 256};
                keyUsages = ["encrypt", "decrypt", "wrapKey", "unwrapKey"];
                break;
            case "X25519":
                format = "pkcs8"; // Asymmetric private keys use "pkcs8"
                keyAlgorithm = {name: "X25519"};
                keyUsages = ["deriveKey", "deriveBits"];
                break;
            case "X25519_PUBLIC":
                format = "raw"; // Asymmetric public keys use "raw"
                keyAlgorithm = {name: "X25519"};
                keyUsages = [];
                break;
            default:
                throw new Error("Unsupported wrappedKeyAlgorithm");
        }

        return await crypto.subtle.unwrapKey(
            format,
            wrappedKeyData,
            unwrappingKey,
            {
                name: "AES-GCM",
                iv: iv,
            },
            keyAlgorithm,
            true,
            keyUsages,
        );
    }

    async generateAesKey(
        secret: string,
        salt: string,
        extractable: boolean = true,
    ): Promise<CryptoKey> {
        const encoder: TextEncoder = new TextEncoder();
        const importedKey: CryptoKey = await crypto.subtle.importKey(
            "raw",
            encoder.encode(secret),
            {name: "PBKDF2"},
            false,
            ["deriveBits"],
        );

        const derivedBits: ArrayBuffer = await crypto.subtle.deriveBits(
            {
                name: "PBKDF2",
                salt: encoder.encode(salt),
                iterations: 200_000,
                hash: "SHA-512",
            },
            importedKey,
            256,
        );

        return await crypto.subtle.importKey(
            "raw",
            derivedBits,
            {
                name: "AES-GCM",
                length: 256,
            },
            extractable,
            ["encrypt", "decrypt", "wrapKey", "unwrapKey"],
        );
    }

    async encryptWithAesGcmStream(
        sourceStream: Readable,
        key: CryptoKey,
    ): Promise<{
        encryptedStream: Readable;
        iv: string;
        getAuthTag: () => Promise<string>;
        getEncryptedSize: () => Promise<number>;
    }> {
        const iv: Buffer = crypto.randomBytes(12);
        const exportedKey: Buffer = Buffer.from(
            await crypto.subtle.exportKey("raw", key),
        );

        const cipher: crypto.CipherGCM = crypto.createCipheriv(
            "aes-256-gcm",
            exportedKey,
            iv,
        );

        let encryptedSize: number = 0;
        cipher.on("data", (chunk: Buffer) => {
            encryptedSize += chunk.length;
        });

        const finalizationPromise = new Promise<{
            authTag: Buffer;
            size: number;
        }>((resolve, reject) => {
            cipher.on("finish", () => {
                resolve({
                    authTag: cipher.getAuthTag(),
                    size: encryptedSize,
                });
            });
            cipher.on("error", reject);
            sourceStream.on("error", (err) => cipher.emit("error", err));
        });

        const encryptedStream: crypto.CipherGCM = sourceStream.pipe(cipher);

        return {
            encryptedStream,
            iv: iv.toString("base64"),
            getAuthTag: () =>
                finalizationPromise.then((data) =>
                    data.authTag.toString("base64"),
                ),
            getEncryptedSize: () =>
                finalizationPromise.then((data) => data.size),
        };
    }

    async decryptWithAesGcmStream(
        encryptedStream: Readable,
        key: CryptoKey,
        iv: string,
        authTag: string,
    ): Promise<Readable> {
        const ivBuffer: Buffer = Buffer.from(iv, "base64");
        const authTagBuffer: Buffer = Buffer.from(authTag, "base64");
        const exportedKey: Buffer = Buffer.from(
            await crypto.subtle.exportKey("raw", key),
        );

        const decipher: crypto.DecipherGCM = crypto.createDecipheriv(
            "aes-256-gcm",
            exportedKey,
            ivBuffer,
        );
        decipher.setAuthTag(authTagBuffer);

        const decryptedStream: crypto.DecipherGCM =
            encryptedStream.pipe(decipher);

        encryptedStream.on("error", (err) => {
            decryptedStream.emit("error", err);
        });

        return decryptedStream;
    }

    async encryptWithAesGcm(
        key: CryptoKey,
        data: Buffer,
        additionalData?: Buffer,
    ): Promise<Buffer> {
        const iv: Buffer = this.randomBytes(12);
        const ciphertext: ArrayBuffer = await crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: iv,
                additionalData,
            },
            key,
            data,
        );

        return Buffer.concat([iv, Buffer.from(ciphertext)]);
    }

    async decryptWithAesGcm(
        key: CryptoKey,
        data: Buffer,
        additionalData?: Buffer,
    ): Promise<ArrayBuffer> {
        const iv: Buffer = data.subarray(0, 12);
        const ciphertext: Buffer = data.subarray(12);
        return await crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: iv,
                additionalData,
            },
            key,
            ciphertext,
        );
    }

    async encryptWithX25519(
        receiverPublicKey: CryptoKey,
        data: Buffer,
    ): Promise<Buffer> {
        const ephemeralKeyPair: CryptoKeyPair = await this.generateKeysX25519();

        const sharedSecret: CryptoKey = await crypto.subtle.deriveKey(
            {
                name: "X25519",
                public: receiverPublicKey,
            },
            ephemeralKeyPair.privateKey,
            {
                name: "AES-GCM",
                length: 256,
            },
            true,
            ["encrypt"],
        );

        const iv: Buffer = this.randomBytes(12);
        const ciphertext: ArrayBuffer = await crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: iv,
            },
            sharedSecret,
            data,
        );

        const ephemPublicKey: ArrayBuffer = await crypto.subtle.exportKey(
            "raw",
            ephemeralKeyPair.publicKey,
        );

        return Buffer.concat([
            Buffer.from(ephemPublicKey),
            iv,
            Buffer.from(ciphertext),
        ]);
    }

    async decryptWithX25519(
        receiverPrivateKey: CryptoKey,
        data: Buffer,
    ): Promise<ArrayBuffer> {
        const ephemeralPublicKeyBuffer: Buffer = data.subarray(0, 32);
        const iv: Buffer = data.subarray(32, 44);
        const ciphertext: Buffer = data.subarray(44);

        const ephemeralPublicKey: CryptoKey = await crypto.subtle.importKey(
            "raw",
            ephemeralPublicKeyBuffer,
            {
                name: "X25519",
            },
            true,
            [],
        );

        const sharedSecret: CryptoKey = await crypto.subtle.deriveKey(
            {
                name: "X25519",
                public: ephemeralPublicKey,
            },
            receiverPrivateKey,
            {
                name: "AES-GCM",
                length: 256,
            },
            true,
            ["decrypt"],
        );

        return await crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv,
            },
            sharedSecret,
            ciphertext,
        );
    }
}
