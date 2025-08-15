import {UserEntity} from "./entities/user.entity";
import {SecurityService} from "../security/security.service";
import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import {PrismaService} from "../helper/prisma.service";
import {SecurityUtilsService} from "../security/security-utils.service";
import {UsersGetPayload} from "../../../prisma/generated/models/Users";

export type CompletePrismaUser = UsersGetPayload<{
    include: {
        avatars: true;
        email_verifications: true;
        master_key: true;
        asymmetric_master_key: true;
    };
}>;

@Injectable()
export class UsersService {
    constructor(
        private readonly kmsService: SecurityService,
        private readonly kmsUtilService: SecurityUtilsService,
        private readonly prismaService: PrismaService,
    ) {}

    async toUser(user: CompletePrismaUser): Promise<UserEntity> {
        const masterKey: CryptoKey = await this.kmsService.unwrapMasterKey(
            Buffer.from(user.master_key.material as Uint8Array),
        );
        const keyPair: CryptoKeyPair =
            await this.kmsService.unwrapAsymmetricKeypair({
                wrappedPublicKey: Buffer.from(
                    user.asymmetric_master_key.public_material as Uint8Array,
                ),
                wrappedPrivateKey: Buffer.from(
                    user.asymmetric_master_key.private_material as Uint8Array,
                ),
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
            verified: !user.email_verifications,
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
                email_verifications: true,
                master_key: true,
                asymmetric_master_key: true,
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
