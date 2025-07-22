import {NewsletterController} from "./newsletter.controller";
import HelperModule from "../helper/helper.module";
import {KmsModule} from "../kms/kms.module";
import {Module} from "@nestjs/common";

@Module({
    imports: [HelperModule, KmsModule],
    controllers: [NewsletterController],
    providers: [],
    exports: [],
})
export class NewsletterModule {}
