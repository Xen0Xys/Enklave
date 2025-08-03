import {Controller, Get, HttpCode, Patch, UseGuards} from "@nestjs/common";
import {ChangePasswordDto} from "./dto/change-password.dto";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {User} from "../auth/decorators/users.decorator";
import {UserEntity} from "./entities/user.entity";
import {Body} from "@nestjs/common/decorators";
import {ApiBearerAuth} from "@nestjs/swagger";
import {UsersService} from "./users.service";
import {HttpStatus} from "@nestjs/common/enums/http-status.enum";
import {ChangeUsernameDto} from "./dto/change-username.dto";

@Controller("users")
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

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
}
