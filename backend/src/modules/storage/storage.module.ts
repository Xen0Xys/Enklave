import {FoldersService} from "./folders.service";
import {KmsModule} from "../kms/kms.module";
import {Module} from "@nestjs/common";
import {FilesService} from "./files.service";
import {StorageService} from "./storage.service";

@Module({
    imports: [KmsModule],
    controllers: [],
    providers: [StorageService, FilesService, FoldersService],
    exports: [StorageService, FilesService, FoldersService],
})
export class StorageModule {}
