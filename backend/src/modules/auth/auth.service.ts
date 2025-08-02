import {WrappedKeyPair} from "../kms/entities/wrapped-key-pair";
import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import {StorageService} from "../storage/storage.service";
import {KmsUtilsService} from "../kms/kms-utils.service";
import {UserEntity} from "../users/entities/user.entity";
import {PrismaService} from "../helper/prisma.service";
import {Users} from "../../../prisma/generated/client";
import {UsersService} from "../users/users.service";
import {LoginEntity} from "./entities/login.entity";
import {KmsService} from "../kms/kms.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly kmsUtilsService: KmsUtilsService,
        private readonly kmsService: KmsService,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly storageService: StorageService,
    ) {}

    async registerUser(
        username: string,
        email: string,
        password: string,
    ): Promise<LoginEntity> {
        // Check if the user already exists
        const existingUser = await this.prismaService.users.findUnique({
            where: {email},
        });
        if (existingUser)
            throw new ConflictException("User already exists with this email.");
        // Create the user
        const hashedPassword: string =
            await this.kmsUtilsService.hashPassword(password);
        const masterKey: CryptoKey =
            await this.kmsService.generateRandomSymmetricKey();
        const wrappedMasterKey: Buffer =
            await this.kmsService.wrapMasterKey(masterKey);
        const keyPair: CryptoKeyPair =
            await this.kmsService.generateAsymmetricKeyPair();
        const wrappedKeyPair: WrappedKeyPair =
            await this.kmsService.wrapAsymmetricKeypair(keyPair);

        const prismaUser: Users = await this.prismaService.users.create({
            data: {
                id: this.kmsUtilsService.generateUuid(),
                username,
                email,
                password: hashedPassword,
                jwt_id: this.kmsUtilsService.randomBytes(32),
                master_key: wrappedMasterKey,
                public_key: wrappedKeyPair.wrappedPublicKey,
                private_key: wrappedKeyPair.wrappedPrivateKey,
            },
        });

        const user: UserEntity = await this.usersService.toUser(prismaUser);

        // Create default folders for the user
        await this.storageService.createDefaultFolders(user);

        return new LoginEntity({
            user,
            token: this.jwtService.sign(
                {},
                {
                    subject: prismaUser.id,
                    expiresIn: "30d",
                    jwtid: prismaUser.jwt_id.toHex(),
                },
            ),
        });
    }

    async loginUser(email: string, password: string): Promise<LoginEntity> {
        // Find the user by username or email
        const user: Users | null = await this.prismaService.users.findFirst({
            where: {email},
        });
        if (!user) throw new NotFoundException("User not found.");

        // Verify the password
        const isPasswordValid: boolean =
            await this.kmsUtilsService.verifyPassword(password, user.password);
        if (!isPasswordValid)
            throw new UnauthorizedException("Invalid password.");

        // Create a login entity and return it
        return new LoginEntity({
            user: await this.usersService.toUser(user),
            token: this.jwtService.sign(
                {},
                {
                    subject: user.id,
                    expiresIn: "30d",
                    jwtid: user.jwt_id.toHex(),
                },
            ),
        });
    }
}
