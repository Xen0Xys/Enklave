import {KmsUtilsService} from "./kms-utils.service";
import {KmsService} from "./kms.service";
import {Module} from "@nestjs/common";

@Module({
    imports: [],
    controllers: [],
    providers: [KmsUtilsService, KmsService],
    exports: [],
})
export class KmsModule {}
