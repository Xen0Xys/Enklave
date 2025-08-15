import {SecurityUtilsService} from "./security-utils.service";
import {SecurityService} from "./security.service";
import {Module} from "@nestjs/common";
import {KmsService} from "./kms.service";

@Module({
    imports: [],
    controllers: [],
    providers: [SecurityUtilsService, SecurityService, KmsService],
    exports: [SecurityUtilsService, SecurityService, KmsService],
})
export class SecurityModule {}
