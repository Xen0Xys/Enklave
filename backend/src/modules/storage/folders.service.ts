import {ConflictException, Injectable} from "@nestjs/common";
import {FolderTypes} from "../../../prisma/generated/enums";
import {SecurityUtilsService} from "../security/security-utils.service";
import {UserEntity} from "../users/entities/user.entity";
import {PrismaService, TxClient} from "../helper/prisma.service";
import {SecurityService} from "../security/security.service";
import {AesKeyData, KmsService} from "../security/kms.service";

@Injectable()
export class FoldersService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly securityService: SecurityService,
        private readonly securityUtilsService: SecurityUtilsService,
        private readonly kmsService: KmsService,
    ) {}

    async createDefaultFolders(user: UserEntity, tx?: TxClient): Promise<void> {
        // Create media folder
        await this.createFolder(
            user,
            "Media",
            undefined,
            FolderTypes.MEDIA,
            tx,
        );
    }

    private async createFolder(
        user: UserEntity,
        name?: string,
        parentId?: string,
        type?: FolderTypes,
        tx?: TxClient,
    ): Promise<void> {
        const folderKeyData: AesKeyData =
            await this.kmsService.generateRandomAesKey(user.masterKey);
        try {
            await this.prismaService.withTx(tx).folders.create({
                data: {
                    user_id: user.id,
                    name: name || "New Folder",
                    parent_id: parentId,
                    folder_key_id: folderKeyData.keyId,
                    type,
                },
            });
        } catch {
            throw new ConflictException(
                "Folder already exists or conflict occurred",
            );
        }
    }
}
