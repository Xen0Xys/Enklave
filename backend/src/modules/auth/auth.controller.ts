import {Controller} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {Body, Post} from "@nestjs/common/decorators";
import {RegisterDto} from "./dto/register.dto";
import {LoginEntity} from "./entities/login.entity";
import {LoginDto} from "./dto/login.dto";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("register")
    async registerUser(@Body() body: RegisterDto): Promise<LoginEntity> {
        const {username, email, password} = body;
        return await this.authService.registerUser(username, email, password);
    }

    @Post("login")
    async loginUser(@Body() body: LoginDto): Promise<LoginEntity> {
        const {email, password} = body;
        return await this.authService.loginUser(email, password);
    }
}
