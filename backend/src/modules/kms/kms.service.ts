import {WrappedKeyPair} from "./entities/wrapped-key-pair";
import {KmsUtilsService} from "./kms-utils.service";
import {Injectable, Logger} from "@nestjs/common";

@Injectable()
export class KmsService {
    private logger: Logger = new Logger(KmsService.name);
    private appKeyGenerationPromise: Promise<void> | undefined;
    private appKey: CryptoKey;

    constructor(private readonly kmsUtilsService: KmsUtilsService) {
        this.appKeyGenerationPromise = this.generateAppKey()
            .then(() => {
                this.logger.log("App key generated successfully.");
            })
            .catch((error: Error) => {
                this.logger.error("Failed to generate app key:", error);
            });
    }

    async awaitInitialization(): Promise<void> {
        await this.appKeyGenerationPromise;
        this.appKeyGenerationPromise = undefined; // Clear the promise after resolution
    }

    async generateAppKey() {
        if (!process.env.APP_SECRET)
            throw new Error("APP_SECRET environment variable is not set.");
        const appSecret: string = process.env.APP_SECRET;
        const appSalt: string = this.kmsUtilsService
            .hash("cloud.enklave.app")
            .toString("hex"); // Use a fixed salt for the app key
        this.appKey = await this.kmsUtilsService.generateAesKey(
            appSecret,
            appSalt,
            false,
        );
    }

    async generateRandomMasterKey(): Promise<CryptoKey> {
        await this.awaitInitialization();
        const secret: string = this.kmsUtilsService
            .randomBytes(32)
            .toString("base64");
        const salt: string = this.kmsUtilsService
            .randomBytes(32)
            .toString("base64");
        return await this.kmsUtilsService.generateAesKey(secret, salt, true);
    }

    async wrapMasterKey(masterKey: CryptoKey): Promise<Buffer> {
        await this.awaitInitialization();
        return await this.kmsUtilsService.wrapCryptoKey(masterKey, this.appKey);
    }

    async unwrapMasterKey(wrappedMasterKey: Buffer): Promise<CryptoKey> {
        await this.awaitInitialization();
        return await this.kmsUtilsService.unwrapCryptoKey(
            wrappedMasterKey,
            this.appKey,
            "AES-GCM",
        );
    }

    async generateAsymmetricKeyPair(): Promise<CryptoKeyPair> {
        await this.awaitInitialization();
        return await this.kmsUtilsService.generateKeysX25519();
    }

    async wrapAsymmetricKeypair(
        keyPair: CryptoKeyPair,
    ): Promise<WrappedKeyPair> {
        await this.awaitInitialization();
        const wrappedPrivateKey: Buffer =
            await this.kmsUtilsService.wrapCryptoKey(
                keyPair.privateKey,
                this.appKey,
            );
        const wrappedPublicKey: ArrayBuffer = await crypto.subtle.exportKey(
            "raw",
            keyPair.publicKey,
        );
        return {
            wrappedPrivateKey: wrappedPrivateKey,
            wrappedPublicKey: Buffer.from(wrappedPublicKey),
        };
    }

    async unwrapAsymmetricKeypair(
        wrappedKeyPair: WrappedKeyPair,
    ): Promise<CryptoKeyPair> {
        await this.awaitInitialization();
        const privateKey: CryptoKey =
            await this.kmsUtilsService.unwrapCryptoKey(
                wrappedKeyPair.wrappedPrivateKey,
                this.appKey,
                "X25519",
            );
        const publicKey: CryptoKey = await crypto.subtle.importKey(
            "raw",
            wrappedKeyPair.wrappedPublicKey,
            {
                name: "X25519",
            },
            true,
            [],
        );
        return {
            privateKey: privateKey,
            publicKey: publicKey,
        };
    }
}
