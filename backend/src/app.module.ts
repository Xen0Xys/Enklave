import {ClassSerializerInterceptor} from "@nestjs/common/serializer";
import HelperModule from "./modules/helper/helper.module";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {Module} from "@nestjs/common";
import {ScheduleModule} from "@nestjs/schedule";
import {ThrottlerModule} from "@nestjs/throttler";
import {KmsModule} from "./modules/kms/kms.module";
import {AuthModule} from "./modules/auth/auth.module";
import {NewsletterModule} from "./modules/newsletter/newsletter.module";

@Module({
    imports: [
        ScheduleModule.forRoot(),
        ThrottlerModule.forRoot([
            {
                ttl: 60000,
                limit: 60,
            },
        ]),
        HelperModule,
        NewsletterModule,
        KmsModule,
        AuthModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor,
        },
    ],
})
export class AppModule {}
