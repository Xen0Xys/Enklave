import {Injectable, Logger, OnModuleInit} from "@nestjs/common";
import {PrismaClient} from "../../../prisma/generated/client";
import {PrismaPg} from "@prisma/adapter-pg";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    static readonly logger: Logger = new Logger(PrismaService.name);

    constructor() {
        const adapter: PrismaPg = new PrismaPg({
            connectionString: process.env.DATABASE_URL,
        });
        super({adapter});
        return this.$extends({
            query: {
                async $allOperations({
                    operation,
                    model,
                    args,
                    query,
                }): Promise<any> {
                    const startTime: number = Date.now();
                    const result: any = await query(args);
                    const duration: number = Date.now() - startTime;
                    const requestCount: number = args.length || 1;
                    const resultCount: number = !result
                        ? 0
                        : result.length || 1;
                    PrismaService.logger.log(
                        `${model?.toUpperCase()} ${operation.toLowerCase()} ${duration}ms ${requestCount} ${resultCount}`,
                    );
                    return result;
                },
            },
        }) as PrismaService;
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
