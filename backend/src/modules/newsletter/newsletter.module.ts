import {NewsletterController} from "./newsletter.controller";
import HelperModule from "../helper/helper.module";
import {SecurityModule} from "../security/security.module";
import {Module} from "@nestjs/common";

@Module({
    imports: [HelperModule, SecurityModule],
    controllers: [NewsletterController],
    providers: [],
    exports: [],
})
export class NewsletterModule {}
