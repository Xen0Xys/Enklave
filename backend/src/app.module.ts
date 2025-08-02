import {NewsletterModule} from "./modules/newsletter/newsletter.module";
import {ClassSerializerInterceptor} from "@nestjs/common/serializer";
import {StorageModule} from "./modules/storage/storage.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import HelperModule from "./modules/helper/helper.module";
import {UsersModule} from "./modules/users/users.module";
import {AuthModule} from "./modules/auth/auth.module";
import {KmsModule} from "./modules/kms/kms.module";
import {ThrottlerModule} from "@nestjs/throttler";
import {ScheduleModule} from "@nestjs/schedule";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {JwtModule} from "@nestjs/jwt";
import {Module} from "@nestjs/common";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        JwtModule.registerAsync({
            global: true,
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>("APP_SECRET"),
                signOptions: {
                    expiresIn: "7d",
                    algorithm: "HS512",
                    issuer: configService.get<string>("APP_NAME"),
                },
                verifyOptions: {
                    algorithms: ["HS512"],
                    issuer: configService.get<string>("APP_NAME"),
                },
            }),
        }),
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
        StorageModule,
        UsersModule,
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
