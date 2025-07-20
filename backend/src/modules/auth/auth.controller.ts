import {PrismaService} from "../helper/prisma.service";
import {Controller, Post} from "@nestjs/common";
import AuthService from "./auth.service";

@Controller("auth")
export default class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly prismaService: PrismaService,
    ) {}

    @Post("login")
    async login() {
        return this.prismaService.users.findFirst();
    }
}
