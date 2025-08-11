import {ConflictException, Injectable} from "@nestjs/common";
import {FolderTypes} from "../../../prisma/generated/enums";
import {KmsUtilsService} from "../kms/kms-utils.service";
import {UserEntity} from "../users/entities/user.entity";
import {PrismaService, TxClient} from "../helper/prisma.service";
import {KmsService} from "../kms/kms.service";

@Injectable()
export class FoldersService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly kmsService: KmsService,
        private readonly kmsUtilsService: KmsUtilsService,
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
        const folderKey: CryptoKey =
            await this.kmsService.generateRandomSymmetricKey();
        const wrappedFolderKey: Buffer = await this.kmsService.wrapSymmetricKey(
            user,
            folderKey,
        );
        try {
            await this.prismaService.withTx(tx).folders.create({
                data: {
                    user_id: user.id,
                    name: name || "New Folder",
                    parent_id: parentId,
                    type,
                    folder_key: wrappedFolderKey,
                },
            });
            // oxlint-disable-next-line no-unused-vars
        } catch (_: any) {
            throw new ConflictException(
                "Folder already exists or conflict occurred",
            );
        }
    }
}
