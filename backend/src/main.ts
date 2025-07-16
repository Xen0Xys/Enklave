import {FastifyAdapter, NestFastifyApplication} from "@nestjs/platform-fastify";
import {CustomValidationPipe} from "./common/pipes/validation.pipe";
import {LoggerMiddleware} from "./common/middlewares/logger.middleware";
import {SwaggerTheme, SwaggerThemeNameEnum} from "swagger-themes";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {FastifyListenOptions} from "fastify/types/instance";
import fastifyMultipart from "@fastify/multipart";
import fastifyHelmet from "@fastify/helmet";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {Logger} from "@nestjs/common";

const logger: Logger = new Logger("App");

process.env.APP_NAME = process.env.npm_package_name
    ?.split("-")
    .map((word: string): string => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 4000;

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({exposeHeadRoutes: true}),
    );
    await loadServer(app);

    await app.listen({
        port: port,
        host: "0.0.0.0",
    } as FastifyListenOptions);
    app.enableShutdownHooks();
    logger.log(`Listening on http://0.0.0.0:${port}`);
}

async function loadServer(server: NestFastifyApplication) {
    // Config
    server.setGlobalPrefix(process.env.PREFIX || "");
    server.enableCors({
        origin: "*",
    });

    // Middlewares
    server.use(new LoggerMiddleware().use);
    await server.register(fastifyMultipart as any);
    await server.register(
        fastifyHelmet as any,
        {
            contentSecurityPolicy: false,
            crossOriginEmbedderPolicy: false,
            crossOriginOpenerPolicy: false,
            crossOriginResourcePolicy: false,
        } as any,
    );

    // Swagger
    const config = new DocumentBuilder()
        .setTitle(process.env.APP_NAME || "NestJS Application")
        .setDescription(`Documentation for ${process.env.APP_NAME}`)
        .setVersion(process.env.npm_package_version || "Unknown")
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(server, config);
    const theme = new SwaggerTheme();
    const customCss = theme.getBuffer(SwaggerThemeNameEnum.DARK);
    SwaggerModule.setup("api", server, document, {
        swaggerOptions: {
            filter: true,
            displayRequestDuration: true,
            persistAuthorization: true,
            docExpansion: "none",
            tagsSorter: "alpha",
            operationsSorter: "method",
        },
        customCss,
    });

    server.useGlobalPipes(new CustomValidationPipe());
}

bootstrap();
