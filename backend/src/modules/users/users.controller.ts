import {
    BadRequestException,
    Controller,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Patch,
    Req,
    Res,
    UseGuards,
} from "@nestjs/common";
import {ChangePasswordDto} from "./dto/change-password.dto";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {User} from "../auth/decorators/users.decorator";
import {UserEntity} from "./entities/user.entity";
import {Body, Post} from "@nestjs/common/decorators";
import {ApiBearerAuth, ApiBody, ApiConsumes} from "@nestjs/swagger";
import {UsersService} from "./users.service";
import {HttpStatus} from "@nestjs/common/enums/http-status.enum";
import {ChangeUsernameDto} from "./dto/change-username.dto";
import {FastifyReply, FastifyRequest} from "fastify";
import {StorageService} from "../storage/storage.service";
import {KmsService} from "../kms/kms.service";
import {PrismaService} from "../helper/prisma.service";
import {CryptoKey} from "@simplewebauthn/server/script/types/dom";
import {Avatars, ServerFiles} from "../../../prisma/generated/client";
import * as sharp from "sharp";
import {Readable} from "stream";

@Controller("users")
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly prismaService: PrismaService,
        private readonly storageService: StorageService,
        private readonly kmsService: KmsService,
    ) {}

    @Get("me")
    @ApiBearerAuth()
    getMe(@User() user: UserEntity): UserEntity {
        return user;
    }

    @Patch("password")
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiBearerAuth()
    async changePassword(
        @User() user: UserEntity,
        @Body() body: ChangePasswordDto,
    ): Promise<void> {
        return await this.usersService.changePassword(
            user,
            body.oldPassword,
            body.newPassword,
        );
    }

    @Patch("username")
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiBearerAuth()
    async changeUsername(
        @User() user: UserEntity,
        @Body() body: ChangeUsernameDto,
    ): Promise<void> {
        return await this.usersService.changeUsername(user, body.username);
    }

    @Post("avatar")
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiBearerAuth()
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        description:
            "Fichier avatar à uploader. Seules les images sont autorisées.",
        schema: {
            type: "object",
            properties: {
                file: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    })
    async changeAvatar(
        @User() user: UserEntity,
        @Req() req: FastifyRequest,
    ): Promise<void> {
        if (!req.isMultipart())
            throw new BadRequestException("Request is not multipart");
        const part = await req.file();
        if (!part) throw new BadRequestException("No file uploaded");
        const mimeType: string | undefined = part?.mimetype;
        if (!mimeType || !mimeType.startsWith("image/"))
            throw new BadRequestException(
                "Invalid file type. Only images are allowed.",
            );

        // Find and delete old avatar if it exists
        const oldAvatar: Avatars | null =
            await this.prismaService.avatars.findFirst({
                where: {user_id: user.id},
            });
        if (oldAvatar)
            await this.storageService.deleteServerFile(
                oldAvatar.server_file_id,
            );

        const transformer: sharp.Sharp = sharp().webp({
            preset: "picture",
            effort: 6,
            smartSubsample: false,
            quality: 80,
            nearLossless: false,
            lossless: false,
            alphaQuality: 100,
        });
        const transformedStream: Readable = part.file.pipe(transformer);

        const appKey: CryptoKey = await this.kmsService.getAppKey();
        const serverFile: ServerFiles =
            await this.storageService.uploadFileStream(
                transformedStream,
                appKey,
                "image/webp",
            );
        await this.prismaService.avatars.create({
            data: {
                user_id: user.id,
                server_file_id: serverFile.id,
            },
        });
    }

    @Get("avatar/:avatarId")
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    async getAvatar(
        @User() user: UserEntity,
        @Param("avatarId") avatarId: string,
        @Res() res: FastifyReply,
    ): Promise<void> {
        const avatar: Avatars | null =
            await this.prismaService.avatars.findFirst({
                where: {user_id: user.id},
            });
        if (!avatar) throw new BadRequestException("No avatar found for user");
        const serverFile: ServerFiles | null =
            await this.storageService.getServerFileFromId(avatarId);
        if (!serverFile) throw new NotFoundException("Avatar not found");
        const appKey: CryptoKey = await this.kmsService.getAppKey();
        // Set mimeType
        res.header("Content-Type", "image/webp");
        const buffer: Buffer = await this.storageService.downloadFileBuffer(
            serverFile,
            appKey,
        );
        res.send(buffer);
    }
}
