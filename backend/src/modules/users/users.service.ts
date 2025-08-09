import {UserEntity} from "./entities/user.entity";
import {KmsService} from "../kms/kms.service";
import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import {PrismaService} from "../helper/prisma.service";
import {KmsUtilsService} from "../kms/kms-utils.service";
import {UsersGetPayload} from "../../../prisma/generated/models/Users";

export type UserWithAvatar = UsersGetPayload<{
    include: {
        avatars: true;
    };
}>;

@Injectable()
export class UsersService {
    constructor(
        private readonly kmsService: KmsService,
        private readonly kmsUtilService: KmsUtilsService,
        private readonly prismaService: PrismaService,
    ) {}

    async toUser(user: UserWithAvatar): Promise<UserEntity> {
        const masterKey: CryptoKey = await this.kmsService.unwrapMasterKey(
            Buffer.from(user.master_key),
        );
        const keyPair: CryptoKeyPair =
            await this.kmsService.unwrapAsymmetricKeypair({
                wrappedPublicKey: Buffer.from(user.public_key),
                wrappedPrivateKey: Buffer.from(user.private_key),
            });
        return new UserEntity({
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            jwtId: Buffer.from(user.jwt_id),
            avatarId: user.avatars?.server_file_id,
            createdAt: user.created_at,
            updatedAt: user.updated_at,
            masterKey,
            publicKey: keyPair.publicKey,
            privateKey: keyPair.privateKey,
        });
    }

    async getUserById(user_id: string): Promise<UserEntity> {
        const user = await this.prismaService.users.findUnique({
            where: {id: user_id},
            include: {
                avatars: true,
            },
        });
        if (!user) throw new NotFoundException("User not found");
        return this.toUser(user);
    }

    async changePassword(
        user: UserEntity,
        oldPassword: string,
        newPassword: string,
    ): Promise<void> {
        if (
            !(await this.kmsUtilService.verifyPassword(
                oldPassword,
                user.password,
            ))
        )
            throw new UnauthorizedException("Old password is incorrect");
        const hashedNewPassword: string =
            await this.kmsUtilService.hashPassword(newPassword);
        await this.prismaService.users.update({
            where: {id: user.id},
            data: {
                password: hashedNewPassword,
                updated_at: new Date(),
            },
        });
    }

    async changeUsername(user: UserEntity, username: string): Promise<void> {
        await this.prismaService.users.update({
            where: {id: user.id},
            data: {
                username,
                updated_at: new Date(),
            },
        });
    }
}
