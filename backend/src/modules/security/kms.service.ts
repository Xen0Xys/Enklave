import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
import {SecurityUtilsService} from "./security-utils.service";
import {WrappedKeyPair} from "./entities/wrapped-key-pair";
import {SecurityService} from "./security.service";
import {KeyTypes} from "../../../prisma/generated/enums";
import {PrismaService} from "../helper/prisma.service";
import {Keys} from "../../../prisma/generated/client";

export type AesKeyData = {
    keyId: string;
    key: CryptoKey;
};

export type X25519KeyData = {
    keyId: string;
    key: CryptoKeyPair;
};

@Injectable()
export class KmsService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly securityService: SecurityService,
        private readonly securityUtilsService: SecurityUtilsService,
    ) {}

    /**
     * Generates a random AES key, wraps it using the provided wrapping key, and stores it in the database.
     * @param wrappingKey The key used to wrap the generated AES key.
     */
    async generateRandomAesKey(wrappingKey?: CryptoKey): Promise<AesKeyData> {
        if (!wrappingKey) wrappingKey = await this.securityService.getAppKey();
        const key: CryptoKey =
            await this.securityService.generateRandomSymmetricKey();
        const wrappedKey: Buffer =
            await this.securityUtilsService.wrapCryptoKey(key, wrappingKey);

        const prismaKey: Keys = await this.prismaService.keys.create({
            data: {
                type: KeyTypes.AES256,
                material: wrappedKey,
            },
        });
        return {
            keyId: prismaKey.id,
            key: key,
        };
    }

    /**
     * Generates a random X25519 key pair, wraps the keys, and stores them in the database.
     * X25519 key generation is always used for user key, so it is only wrapped using app key.
     */
    async generateRandomX25519KeyPair(): Promise<X25519KeyData> {
        const keyPair: CryptoKeyPair =
            await this.securityService.generateAsymmetricKeyPair();
        const wrappedKey: WrappedKeyPair =
            await this.securityService.wrapAsymmetricKeypair(keyPair);

        const prismaKey: Keys = await this.prismaService.keys.create({
            data: {
                type: KeyTypes.X25519,
                public_material: wrappedKey.wrappedPublicKey,
                private_material: wrappedKey.wrappedPrivateKey,
            },
        });
        return {
            keyId: prismaKey.id,
            key: keyPair,
        };
    }

    /**
     * Retrieves a key from the database by its ID and unwraps it using the provided unwrapping key.
     * @param id The ID of the key to retrieve.
     * @param unwrappingKey The key used to unwrap the stored key.
     */
    async getKeyFromId(
        id: string,
        unwrappingKey: CryptoKey,
    ): Promise<{
        type: "aes" | "x25519";
        key: CryptoKey | CryptoKeyPair;
    }> {
        const key: Keys | null = await this.prismaService.keys.findUnique({
            where: {id},
        });
        if (!key) throw new NotFoundException(`Key with id ${id} not found`);

        switch (key.type) {
            case KeyTypes.AES256:
                const unwrappedKey: CryptoKey =
                    await this.securityUtilsService.unwrapCryptoKey(
                        key.material as Buffer,
                        unwrappingKey,
                        "AES-GCM",
                    );
                return {
                    type: "aes",
                    key: unwrappedKey,
                };
            case KeyTypes.X25519:
                const unwrappedPublicKey: CryptoKey =
                    await this.securityUtilsService.unwrapCryptoKey(
                        key.public_material as Buffer,
                        unwrappingKey,
                        "X25519_PUBLIC",
                    );
                const unwrappedPrivateKey: CryptoKey =
                    await this.securityUtilsService.unwrapCryptoKey(
                        key.private_material as Buffer,
                        unwrappingKey,
                        "X25519",
                    );
                return {
                    type: "x25519",
                    key: {
                        publicKey: unwrappedPublicKey,
                        privateKey: unwrappedPrivateKey,
                    } as CryptoKeyPair,
                };
            default:
                throw new InternalServerErrorException(
                    `Unsupported key type: ${key.type}`,
                );
        }
    }
}
