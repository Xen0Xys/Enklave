import {Injectable} from "@nestjs/common";
import * as crypto from "crypto";

@Injectable()
export class KmsUtilsService {
    randomBytes(length: number): Buffer {
        return crypto.randomBytes(length);
    }

    async hashPassword(data: Bun.StringOrBuffer): Promise<string> {
        return await Bun.password.hash(data, {
            algorithm: "argon2id",
            timeCost: 12,
        });
    }

    hash(data: string | Buffer): Buffer {
        const hash: crypto.Hash = crypto.createHash("sha256");
        hash.update(data);
        return hash.digest();
    }

    async generateRandomKeyPair(): Promise<CryptoKeyPair> {
        return await crypto.subtle.generateKey(
            {
                name: "ECDSA",
                namedCurve: "p-521",
            },
            true,
            ["encrypt", "decrypt"],
        );
    }

    async wrapCryptoKey(
        keyToWrap: CryptoKey,
        wrappingKey: CryptoKey,
    ): Promise<Buffer> {
        const iv: Buffer = crypto.randomBytes(12);
        const wrappedKeyData: ArrayBuffer = await crypto.subtle.wrapKey(
            "raw",
            keyToWrap,
            wrappingKey,
            {
                name: "AES-GCM",
                iv: iv,
            },
        );
        return Buffer.concat([iv, Buffer.from(wrappedKeyData)]);
    }

    async unwrapCryptoKey(
        wrappedKeyBuffer: Buffer,
        unwrappingKey: CryptoKey,
        wrappedKeyAlgorithm: "AES-GCM" | "ECDSA",
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

        if (wrappedKeyAlgorithm === "AES-GCM") {
            keyAlgorithm = {name: "AES-GCM", length: 256};
            keyUsages = ["encrypt", "decrypt", "wrapKey", "unwrapKey"];
        } else if (wrappedKeyAlgorithm === "ECDSA") {
            keyAlgorithm = {name: "ECDSA", namedCurve: "p-521"};
            keyUsages = ["sign", "verify"];
        } else {
            throw new Error("Unsupported wrappedKeyAlgorithm");
        }
        return await crypto.subtle.unwrapKey(
            "raw",
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
        const encoder = new TextEncoder();
        const importedKey: CryptoKey = await crypto.subtle.importKey(
            "raw",
            encoder.encode(secret),
            {name: "PBKDF2"},
            false,
            ["deriveBits"],
        );

        const derivedBits = await crypto.subtle.deriveBits(
            {
                name: "PBKDF2",
                salt: encoder.encode(salt),
                iterations: 200_000,
                hash: "SHA-512",
            },
            importedKey,
            256, // 256 bits = 32 bytes
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
}
