import {CryptoKey} from "@simplewebauthn/server/script/types/dom";
import {ServerFiles} from "../../../prisma/generated/client";
import {SecurityUtilsService} from "../security/security-utils.service";
import {PrismaService} from "../helper/prisma.service";
import {SecurityService} from "../security/security.service";
import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
import {Readable} from "stream";
import {ServerFilesGetPayload} from "../../../prisma/generated/models/ServerFiles";
import {AesKeyData, KmsService} from "../security/kms.service";

export type ExtendedServerFile = ServerFilesGetPayload<{
    include: {
        file_key: true;
    };
}>;

@Injectable()
export class StorageService {
    private readonly s3Client: Bun.S3Client;

    constructor(
        private readonly prismaService: PrismaService,
        private readonly securityUtilsService: SecurityUtilsService,
        private readonly securityService: SecurityService,
        private readonly kmsService: KmsService,
    ) {
        this.s3Client = new Bun.S3Client({
            accessKeyId: process.env.S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
            region: process.env.S3_REGION,
            bucket: process.env.S3_BUCKET,
            endpoint: process.env.S3_ENDPOINT,
        });
    }

    async getServerFileFromId(
        serverFileId: string,
    ): Promise<ServerFiles | null> {
        return this.prismaService.serverFiles.findUnique({
            where: {id: serverFileId},
        });
    }

    async deleteServerFile(serverFileId: string): Promise<void> {
        const serverFile: ServerFiles | null =
            await this.getServerFileFromId(serverFileId);
        if (!serverFile) throw new NotFoundException("Server file not found");
        const remoteFile: Bun.S3File = this.s3Client.file(serverFile.s3_key);
        try {
            await this.prismaService.serverFiles.delete({
                where: {id: serverFileId},
            });
            await remoteFile.delete();
        } catch (e: any) {
            throw new InternalServerErrorException(
                `Failed to delete file: ${e.message}`,
            );
        }
    }

    async uploadFileStream(
        stream: Readable,
        wrappingKey: CryptoKey,
        mimeType?: string,
    ): Promise<ServerFiles> {
        const fileUuid: string = this.securityUtilsService.generateUuid(4);
        const fileKeyData: AesKeyData =
            await this.kmsService.generateRandomAesKey(wrappingKey);
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
            } = await this.securityUtilsService.encryptWithAesGcmStream(
                stream,
                fileKeyData.key,
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
                    checksum: sha256,
                    mime_type: mimeType,
                    file_key: {
                        connect: {
                            id: fileKeyData.keyId,
                        },
                    },
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

    async downloadFileStream(
        serverFile: ExtendedServerFile,
        wrappingKey: CryptoKey,
    ): Promise<Readable> {
        const fileKey: CryptoKey =
            await this.securityUtilsService.unwrapCryptoKey(
                Buffer.from(serverFile.file_key.material as Uint8Array),
                wrappingKey,
                "AES-GCM",
            );
        try {
            const remoteFile: Bun.S3File = this.s3Client.file(
                serverFile.s3_key,
            );
            const reader: ReadableStream = remoteFile.stream();
            const readable: Readable = Readable.fromWeb(reader as any);
            return await this.securityUtilsService.decryptWithAesGcmStream(
                readable,
                fileKey,
                Buffer.from(serverFile.iv),
                Buffer.from(serverFile.auth_tag),
            );
        } catch (e: any) {
            throw new NotFoundException(
                `Failed to download file: ${e.message}`,
            );
        }
    }

    async downloadFileBuffer(
        serverFile: ExtendedServerFile,
        wrappingKey: CryptoKey,
    ): Promise<Buffer> {
        try {
            const readable: Readable = await this.downloadFileStream(
                serverFile,
                wrappingKey,
            );
            const chunks: Buffer[] = [];
            for await (const chunk of readable) chunks.push(chunk);
            return Buffer.concat(chunks);
        } catch (e) {
            throw new NotFoundException(
                `Failed to download file buffer: ${e.message}`,
            );
        }
    }
}
