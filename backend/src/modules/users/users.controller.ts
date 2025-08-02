import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {Controller, Get, UseGuards} from "@nestjs/common";
import {User} from "../auth/decorators/users.decorator";
import {UserEntity} from "./entities/user.entity";
import {ApiBearerAuth} from "@nestjs/swagger";

@Controller("users")
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor() {}

    @Get("me")
    @ApiBearerAuth()
    getMe(@User() user: UserEntity): UserEntity {
        return user;
    }
}
