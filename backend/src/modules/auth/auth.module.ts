import {StorageModule} from "../storage/storage.module";
import {UsersModule} from "../users/users.module";
import {AuthController} from "./auth.controller";
import {KmsModule} from "../kms/kms.module";
import {AuthService} from "./auth.service";
import {Module} from "@nestjs/common";
import {JwtStrategy} from "./strategies/jwt.strategy";

@Module({
    imports: [UsersModule, KmsModule, StorageModule],
    providers: [AuthService, JwtStrategy],
    exports: [],
    controllers: [AuthController],
})
export class AuthModule {}
