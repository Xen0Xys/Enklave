import {StorageModule} from "../storage/storage.module";
import {UsersModule} from "../users/users.module";
import {AuthController} from "./auth.controller";
import {SecurityModule} from "../security/security.module";
import {AuthService} from "./auth.service";
import {Module} from "@nestjs/common";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {MailerModule} from "../mailer/mailer.module";

@Module({
    imports: [UsersModule, SecurityModule, StorageModule, MailerModule],
    providers: [AuthService, JwtStrategy],
    exports: [],
    controllers: [AuthController],
})
export class AuthModule {}
