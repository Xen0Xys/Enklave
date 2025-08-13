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
import {UsersService} from "../users/users.service";
import {LoginEntity} from "./entities/login.entity";
import {KmsService} from "../kms/kms.service";
import {JwtService} from "@nestjs/jwt";
import {MailerService} from "../mailer/mailer.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly kmsUtilsService: KmsUtilsService,
        private readonly kmsService: KmsService,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly storageService: FoldersService,
        private readonly mailerService: MailerService,
    ) {}

    private async resendVerificationEmail(user: Users, oldTokenId: string) {
        const newEmailVerification = await this.prismaService.$transaction(
            async (tx) => {
                await tx.emailVerification.deleteMany({
                    where: {id: oldTokenId},
                });
                return tx.emailVerification.create({
                    data: {
                        user: {connect: {id: user.id}},
                        expires_at: new Date(
                            Date.now() + 30 * 60 * 1000, // 7 days
                        ),
                    },
                });
            },
        );

        await this.mailerService.sendMail(
            user.email,
            "Welcome to Our Service",
            "welcome",
            {
                username: user.username,
                email: user.email,
                verification_link: `${process.env.FRONTEND_URL}/callbacks/verify-email?token=${newEmailVerification.id}`,
            },
        );
    }

    async registerUser(
        username: string,
        email: string,
        password: string,
    ): Promise<void> {
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

        await this.prismaService.$transaction(
            async (tx) => {
                const prismaUser = await this.prismaService
                    .withTx(tx)
                    .users.create({
                        data: {
                            username,
                            email,
                            password: hashedPassword,
                            jwt_id: this.kmsUtilsService.randomBytes(32),
                            master_key: wrappedMasterKey,
                            public_key: wrappedKeyPair.wrappedPublicKey,
                            private_key: wrappedKeyPair.wrappedPrivateKey,
                            email_verifications: {
                                create: {
                                    expires_at: new Date(
                                        Date.now() + 30 * 60 * 1000, // 30 minutes
                                    ),
                                },
                            },
                        },
                        include: {
                            avatars: true,
                            email_verifications: true,
                        },
                    });

                const user: UserEntity =
                    await this.usersService.toUser(prismaUser);

                // Create default folders for the user
                await this.storageService.createDefaultFolders(user, tx);

                await this.mailerService.sendMail(
                    user.email,
                    "Welcome to Our Service",
                    "welcome",
                    {
                        username: user.username,
                        email: user.email,
                        verification_link: `${process.env.FRONTEND_URL}/callbacks/verify-email?token=${prismaUser.email_verifications?.id}`,
                    },
                );

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
            },
            {
                timeout: 15000,
            },
        );
    }

    async verifyEmail(token: string): Promise<void> {
        // Find the email verification record
        const emailVerification =
            await this.prismaService.emailVerification.findUnique({
                where: {
                    id: token,
                },
                include: {
                    user: true,
                },
            });

        if (!emailVerification)
            throw new NotFoundException("Email verification token not found.");

        if (emailVerification.expires_at < new Date()) {
            await this.resendVerificationEmail(emailVerification.user, token);
            throw new UnauthorizedException(
                "Email verification token has expired, a new one has been sent to your email address.",
            );
        }

        await this.prismaService.emailVerification.delete({
            where: {
                id: token,
            },
        });
    }

    async loginUser(email: string, password: string): Promise<LoginEntity> {
        // Find the user by username or email
        const prismaUser = await this.prismaService.users.findFirst({
            where: {email},
            include: {
                avatars: true,
                email_verifications: true,
            },
        });
        if (!prismaUser) throw new NotFoundException("User not found.");
        if (prismaUser.email_verifications) {
            if (prismaUser.email_verifications.expires_at < new Date()) {
                await this.resendVerificationEmail(
                    prismaUser,
                    prismaUser.email_verifications.id,
                );
                throw new UnauthorizedException(
                    "User is not verified. A new verification email has been sent.",
                );
            }
            throw new UnauthorizedException("User is not verified.");
        }

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
