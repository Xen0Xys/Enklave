import {WrappedKeyPair} from "../src/modules/kms/entities/wrapped-key-pair";
import {KmsUtilsService} from "../src/modules/kms/kms-utils.service";
import {UsersCreateInput} from "./generated/models/Users";
import {KmsService} from "../src/modules/kms/kms.service";
import {PrismaClient} from "./generated/client";
import {PrismaPg} from "@prisma/adapter-pg";

// initialize Prisma Client
const adapter: PrismaPg = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma: PrismaClient = new PrismaClient({adapter});

const kmsUtilsService: KmsUtilsService = new KmsUtilsService();
const kmsService: KmsService = new KmsService(kmsUtilsService);

async function main() {
    const gStart = Date.now();

    // Admin user
    const wrappedMasterKey: Buffer = await kmsService.wrapMasterKey(
        await kmsService.generateRandomMasterKey(),
    );
    const wrappedKeyPair: WrappedKeyPair =
        await kmsService.wrapAsymmetricKeypair(
            await kmsService.generateAsymmetricKeyPair(),
        );
    const adminUser: UsersCreateInput = {
        id: "0195dc7c-f315-7881-b35b-da9cbb6ee4a0",
        username: process.env.ADMIN_USERNAME || "admin",
        email: process.env.ADMIN_EMAIL || "admin@admin.com",
        password: await kmsUtilsService.hashPassword(
            process.env.ADMIN_PASSWORD || "password@admin.com",
        ),
        jwt_id: kmsUtilsService.randomBytes(32),
        master_key: wrappedMasterKey,
        public_key: wrappedKeyPair.wrappedPublicKey,
        private_key: wrappedKeyPair.wrappedPrivateKey,
    } as UsersCreateInput;
    await idSeed(prisma.users, [adminUser], false);
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
