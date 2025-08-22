import {ContactController} from "./contact.controller";
import {MailerModule} from "../mailer/mailer.module";
import {Module} from "@nestjs/common";

@Module({
    imports: [MailerModule],
    controllers: [ContactController],
    providers: [],
    exports: [],
})
export class ContactModule {}