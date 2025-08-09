import {StorageModule} from "../storage/storage.module";
import {PrismaService} from "../helper/prisma.service";
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";
import {KmsModule} from "../kms/kms.module";
import {Module} from "@nestjs/common";

@Module({
    controllers: [UsersController],
    providers: [UsersService, PrismaService],
    exports: [UsersService],
    imports: [KmsModule, StorageModule],
})
export class UsersModule {}
