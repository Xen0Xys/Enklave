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
import {Avatars, ServerFiles} from "../../../prisma/generated/client";
import {ApiBearerAuth, ApiBody, ApiConsumes} from "@nestjs/swagger";
import {CryptoKey} from "@simplewebauthn/server/script/types/dom";
import {HttpStatus} from "@nestjs/common/enums/http-status.enum";
import {SecurityService} from "../security/security.service";
import {ChangePasswordDto} from "./dto/change-password.dto";
import {ChangeUsernameDto} from "./dto/change-username.dto";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {StorageService} from "../storage/storage.service";
import {ImagesService} from "../storage/images.service";
import {User} from "../auth/decorators/users.decorator";
import {PrismaService} from "../helper/prisma.service";
import {FastifyReply, FastifyRequest} from "fastify";
import {Body, Post} from "@nestjs/common/decorators";
import {UserEntity} from "./entities/user.entity";
import {UsersService} from "./users.service";
import {Readable} from "stream";

@Controller("users")
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly prismaService: PrismaService,
        private readonly storageService: StorageService,
        private readonly kmsService: SecurityService,
        private readonly imagesService: ImagesService,
    ) {}

    @Get("me")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    getMe(@User() user: UserEntity): UserEntity {
        return user;
    }

    @Patch("password")
    @UseGuards(JwtAuthGuard)
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
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiBearerAuth()
    async changeUsername(
        @User() user: UserEntity,
        @Body() body: ChangeUsernameDto,
    ): Promise<void> {
        return await this.usersService.changeUsername(user, body.username);
    }

    @Post("avatar")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiBearerAuth()
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        description: "Avatar file to upload. Only images are allowed.",
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

        const transformedStream: Readable = this.imagesService.toAvatarStream(
            part.file,
        );

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
    async getAvatar(
        @Param("avatarId") avatarId: string,
        @Res() res: FastifyReply,
    ): Promise<void> {
        const avatarFile = await this.prismaService.serverFiles.findFirst({
            where: {
                id: avatarId,
            },
            include: {
                avatar: true,
                file_key: true,
            },
        });
        if (!avatarFile || !avatarFile.avatar)
            throw new NotFoundException("No avatar found for user");
        const appKey: CryptoKey = await this.kmsService.getAppKey();
        // Set mimeType
        const buffer: Buffer = await this.storageService.downloadFileBuffer(
            avatarFile,
            appKey,
        );
        res.header("Content-Type", "image/webp");
        res.send(buffer);
    }
}
