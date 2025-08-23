import {ContactFormDto} from "./dto/contact-form.dto";
import {MailerService} from "../mailer/mailer.service";
import {HttpStatus} from "@nestjs/common/enums/http-status.enum";
import {Body, Post} from "@nestjs/common/decorators";
import {
    Controller,
    HttpCode,
    InternalServerErrorException,
} from "@nestjs/common";

@Controller("contact")
export class ContactController {
    constructor(private readonly mailerService: MailerService) {}

    @Post()
    @HttpCode(HttpStatus.NO_CONTENT)
    async contact(@Body() body: ContactFormDto) {
        const contactEmail: string | undefined = process.env.CONTACT_EMAIL;
        if (!contactEmail)
            throw new InternalServerErrorException(
                "Contact email is not configured",
            );

        await this.mailerService.sendMail(
            contactEmail,
            `Contact Form: ${body.subject}`,
            "contact",
            {
                name: body.name,
                email: body.email,
                subject: body.subject,
                message: body.message,
            },
        );
    }
}
