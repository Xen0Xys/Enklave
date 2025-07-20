import AuthController from "./auth.controller";
import AuthService from "./auth.service";
import {Module} from "@nestjs/common";

@Module({
    imports: [],
    providers: [AuthService],
    exports: [],
    controllers: [AuthController],
})
export default class AuthModule {}
