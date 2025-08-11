import {Injectable, InternalServerErrorException} from "@nestjs/common";
import {createTransport, Transporter} from "nodemailer";
import * as fs from "node:fs";
import * as handlebars from "handlebars";
import Mail from "nodemailer/lib/mailer";

@Injectable()
export class MailerService {
    private readonly transporter: Transporter;

    constructor() {
        this.transporter = createTransport({
            from: process.env.SMTP_FROM,
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || "587", 10),
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }

    async compileTemplate(templateName: string, options: any): Promise<string> {
        const templateContent: string = fs.readFileSync(
            `./src/templates/${templateName}.hbs`,
            "utf8",
        );
        const template: HandlebarsTemplateDelegate =
            handlebars.compile(templateContent);
        return template(options);
    }

    async sendMail(
        target: string,
        subject: string,
        templateName: string,
        options: any,
    ): Promise<void> {
        try {
            const html: string = await this.compileTemplate(
                templateName,
                options,
            );
            const mailOptions: Mail.Options = {
                from: process.env.SMTP_FROM,
                to: target,
                subject: subject,
                html: html,
            };
            await this.transporter.sendMail(mailOptions);
        } catch {
            throw new InternalServerErrorException("Failed to send email");
        }
    }
}
