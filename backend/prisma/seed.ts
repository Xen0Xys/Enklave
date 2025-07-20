import KmsUtilsService from "../src/modules/kms/kms-utils.service";
import {PrismaClient, Users} from "./generated/client";
import {PrismaPg} from "@prisma/adapter-pg";

// initialize Prisma Client
const adapter: PrismaPg = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma: PrismaClient = new PrismaClient({adapter});

const kmsUtilsService: KmsUtilsService = new KmsUtilsService();

async function main() {
    const gStart = Date.now();

    const users_values = [
        {
            id: "0195dc7c-f315-7881-b35b-da9cbb6ee4a0",
            username: process.env.ADMIN_USERNAME || "admin",
            email: process.env.ADMIN_EMAIL || "admin@admin.com",
            password: await kmsUtilsService.hashPassword(
                process.env.ADMIN_PASSWORD || "password@admin.com",
            ),
            jwt_id: kmsUtilsService.randomBytes(32),
            master_key: kmsUtilsService.randomBytes(32),
            public_key: kmsUtilsService.randomBytes(32),
            private_key: kmsUtilsService.randomBytes(32),
        } as Users,
    ];
    await idSeed(prisma.users, users_values, false);
    console.log(`\n✅  Seeding completed ! (${Date.now() - gStart}ms)`);
}

async function idSeed(table: any, data: any[], update: boolean = true) {
    for (let i = 0; i < data.length; i++) {
        await table.upsert({
            where: {id: data[i].id},
            update: update
                ? {
                      ...data[i],
                  }
                : {},
            create: {
                ...data[i],
            },
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
