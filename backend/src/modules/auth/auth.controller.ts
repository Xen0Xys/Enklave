import {PrismaService} from "../helper/prisma.service";
import {Controller} from "@nestjs/common";
import {AuthService} from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly prismaService: PrismaService,
    ) {}
}
