import {StorageService} from "./storage.service";
import {KmsModule} from "../kms/kms.module";
import {Module} from "@nestjs/common";

@Module({
    imports: [KmsModule],
    controllers: [],
    providers: [StorageService],
    exports: [StorageService],
})
export class StorageModule {}
