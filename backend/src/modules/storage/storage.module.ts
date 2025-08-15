import {FoldersService} from "./folders.service";
import {SecurityModule} from "../security/security.module";
import {Module} from "@nestjs/common";
import {FilesService} from "./files.service";
import {StorageService} from "./storage.service";
import {ImagesService} from "./images.service";

@Module({
    imports: [SecurityModule],
    controllers: [],
    providers: [StorageService, FilesService, FoldersService, ImagesService],
    exports: [StorageService, FilesService, FoldersService, ImagesService],
})
export class StorageModule {}
