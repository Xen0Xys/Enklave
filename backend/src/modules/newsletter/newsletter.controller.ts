import {NewsletterSubscribeDto} from "./dto/newsletter-subscribe.dto";
import {HttpStatus} from "@nestjs/common/enums/http-status.enum";
import {KmsUtilsService} from "../kms/kms-utils.service";
import {PrismaService} from "../helper/prisma.service";
import {Body, Delete, Post} from "@nestjs/common/decorators";
import {Controller, HttpCode} from "@nestjs/common";
import {NewsLetterSubscriptions} from "../../../prisma/generated/client";

@Controller("newsletter")
export class NewsletterController {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly kmsUtilsService: KmsUtilsService,
    ) {}

    @Post("subscribe")
    @HttpCode(HttpStatus.NO_CONTENT)
    async subscribe(@Body() body: NewsletterSubscribeDto) {
        const existingSubscription: NewsLetterSubscriptions | null =
            await this.prismaService.newsLetterSubscriptions.findUnique({
                where: {
                    email: body.email,
                },
            });
        if (existingSubscription) return;
        await this.prismaService.newsLetterSubscriptions.create({
            data: {
                email: body.email,
            },
        });
    }

    @Delete("unsubscribe")
    @HttpCode(HttpStatus.NO_CONTENT)
    async unsubscribe(@Body() body: NewsletterSubscribeDto) {
        const existingSubscription: NewsLetterSubscriptions | null =
            await this.prismaService.newsLetterSubscriptions.findUnique({
                where: {
                    email: body.email,
                },
            });
        if (!existingSubscription) return;
        await this.prismaService.newsLetterSubscriptions.delete({
            where: {
                email: body.email,
            },
        });
    }
}
