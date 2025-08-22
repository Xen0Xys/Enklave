import {ContactFormDto} from "./dto/contact-form.dto";
import {MailerService} from "../mailer/mailer.service";
import {HttpStatus} from "@nestjs/common/enums/http-status.enum";
import {Body, Post} from "@nestjs/common/decorators";
import {Controller, HttpCode} from "@nestjs/common";

@Controller("contact")
export class ContactController {
    constructor(private readonly mailerService: MailerService) {}

    @Post()
    @HttpCode(HttpStatus.NO_CONTENT)
    async contact(@Body() body: ContactFormDto) {
        const contactEmail = process.env.CONTACT_EMAIL || "contact@enklave.cloud";
        
        await this.mailerService.sendMail(
            contactEmail,
            `Contact Form: ${body.subject}`,
            "contact",
            {
                name: body.name,
                email: body.email,
                subject: body.subject,
                message: body.message,
            }
        );
    }
}