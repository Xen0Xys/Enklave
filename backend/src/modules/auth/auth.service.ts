import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import {WrappedKeyPair} from "../kms/entities/wrapped-key-pair";
import {FoldersService} from "../storage/folders.service";
import {KmsUtilsService} from "../kms/kms-utils.service";
import {UserEntity} from "../users/entities/user.entity";
import {PrismaService} from "../helper/prisma.service";
import {Users} from "../../../prisma/generated/client";
import {UsersService, UserWithAvatar} from "../users/users.service";
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
        private readonly storageService: FoldersService,
    ) {}

    async registerUser(
        username: string,
        email: string,
        password: string,
    ): Promise<LoginEntity> {
        // Check if the user already exists
        const existingUser: Users | null =
            await this.prismaService.users.findUnique({
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

        const prismaUser: UserWithAvatar =
            await this.prismaService.users.create({
                data: {
                    username,
                    email,
                    password: hashedPassword,
                    jwt_id: this.kmsUtilsService.randomBytes(32),
                    master_key: wrappedMasterKey,
                    public_key: wrappedKeyPair.wrappedPublicKey,
                    private_key: wrappedKeyPair.wrappedPrivateKey,
                },
                include: {
                    avatars: true,
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
                    subject: user.id,
                    expiresIn: "30d",
                    jwtid: user.jwtId.toString("hex"),
                },
            ),
        });
    }

    async loginUser(email: string, password: string): Promise<LoginEntity> {
        // Find the user by username or email
        const prismaUser: UserWithAvatar | null =
            await this.prismaService.users.findFirst({
                where: {email},
                include: {
                    avatars: true,
                },
            });
        if (!prismaUser) throw new NotFoundException("User not found.");

        // Verify the password
        const isPasswordValid: boolean =
            await this.kmsUtilsService.verifyPassword(
                password,
                prismaUser.password,
            );
        if (!isPasswordValid)
            throw new UnauthorizedException("Invalid password.");

        // Create a login entity and return it
        const user: UserEntity = await this.usersService.toUser(prismaUser);
        return new LoginEntity({
            user,
            token: this.jwtService.sign(
                {},
                {
                    subject: user.id,
                    expiresIn: "30d",
                    jwtid: user.jwtId.toString("hex"),
                },
            ),
        });
    }
}
