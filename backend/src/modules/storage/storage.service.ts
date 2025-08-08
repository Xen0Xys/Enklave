import {CryptoKey} from "@simplewebauthn/server/script/types/dom";
import {ServerFiles} from "../../../prisma/generated/client";
import {KmsUtilsService} from "../kms/kms-utils.service";
import {PrismaService} from "../helper/prisma.service";
import {KmsService} from "../kms/kms.service";
import {Injectable} from "@nestjs/common";
import {Readable} from "stream";

@Injectable()
export class StorageService {
    private readonly s3Client: Bun.S3Client;

    constructor(
        private readonly prismaService: PrismaService,
        private readonly kmsUtilsService: KmsUtilsService,
        private readonly kmsService: KmsService,
    ) {
        this.s3Client = new Bun.S3Client({
            accessKeyId: "your-access-key",
            secretAccessKey: "your-secret-key",
            bucket: "my-bucket",
            endpoint: "http://localhost:9000",
        });
    }

    async uploadFileStream(
        stream: Readable,
        wrappingKey: CryptoKey,
        mimeType?: string,
    ): Promise<ServerFiles> {
        const fileUuid: string = this.kmsUtilsService.generateUuid(4);
        const fileKey: CryptoKey =
            await this.kmsService.generateRandomSymmetricKey();
        const remoteFile: Bun.S3File = this.s3Client.file(fileUuid);
        const writer: Bun.NetworkSink = remoteFile.writer();
        try {
            // Encrypt the file stream
            const {
                encryptedStream,
                iv,
                getEncryptedSize,
                getAuthTag,
                getSha256,
            } = await this.kmsUtilsService.encryptWithAesGcmStream(
                stream,
                fileKey,
            );
            // Write the encrypted stream to the writer
            for await (const chunk of encryptedStream) writer.write(chunk);
            await writer.end();

            const sha256: string = await getSha256();
            const authTag: Buffer = await getAuthTag();
            const encryptedSize: number = await getEncryptedSize();

            // Register the file in the database
            return await this.prismaService.serverFiles.create({
                data: {
                    s3_key: fileUuid,
                    thumbnail_s3_key: undefined,
                    checksum: sha256,
                    mime_type: mimeType,
                    file_key: await this.kmsUtilsService.wrapCryptoKey(
                        fileKey,
                        wrappingKey,
                    ),
                    iv,
                    auth_tag: authTag,
                    size: encryptedSize,
                },
            });
        } catch (e: any) {
            // Delete s3 file
            await remoteFile.delete();
            throw e;
        }
    }

    async downloadFileStream(fileSum: string): Promise<Readable> {
        try {
            // Get the file metadata from the database
            // Download the file stream from s3 storage
            // Decrypt the file stream
            return new Readable(); // Placeholder for actual stream
        } catch (e: any) {
            throw new Error(`Failed to download file: ${e.message}`);
        }
    }
}
