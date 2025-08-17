import {HttpStatus} from "@nestjs/common/enums/http-status.enum";
import {Body, HttpCode, Post} from "@nestjs/common/decorators";
import {LoginEntity} from "./entities/login.entity";
import {RegisterDto} from "./dto/register.dto";
import {AuthService} from "./auth.service";
import {VerifyDto} from "./dto/verify.dto";
import {Controller} from "@nestjs/common";
import {LoginDto} from "./dto/login.dto";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("register")
    @HttpCode(HttpStatus.NO_CONTENT)
    async registerUser(@Body() body: RegisterDto): Promise<void> {
        const {username, email, password} = body;
        return await this.authService.registerUser(username, email, password);
    }

    @Post("register/verify")
    @HttpCode(HttpStatus.NO_CONTENT)
    async verifyUser(@Body() body: VerifyDto): Promise<void> {
        return await this.authService.verifyEmail(body.token);
    }

    @Post("login")
    async loginUser(@Body() body: LoginDto): Promise<LoginEntity> {
        const {email, password} = body;
        return await this.authService.loginUser(email, password);
    }
}
