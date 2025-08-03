import {PrismaService} from "../helper/prisma.service";
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";
import {Module} from "@nestjs/common";
import {KmsModule} from "../kms/kms.module";

@Module({
    controllers: [UsersController],
    providers: [UsersService, PrismaService],
    exports: [UsersService],
    imports: [KmsModule],
})
export class UsersModule {}
