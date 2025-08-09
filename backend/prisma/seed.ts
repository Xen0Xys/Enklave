import {WrappedKeyPair} from "../src/modules/kms/entities/wrapped-key-pair";
import {FoldersUncheckedCreateInput} from "./generated/models/Folders";
import {KmsUtilsService} from "../src/modules/kms/kms-utils.service";
import {UserEntity} from "../src/modules/users/entities/user.entity";
import {UsersCreateInput} from "./generated/models/Users";
import {KmsService} from "../src/modules/kms/kms.service";
import {PrismaClient} from "./generated/client";
import {FolderTypes} from "./generated/enums";
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
    let start = Date.now();
    const masterKey: CryptoKey = await kmsService.generateRandomSymmetricKey();
    const wrappedMasterKey: Buffer = await kmsService.wrapMasterKey(masterKey);
    const keyPair: CryptoKeyPair = await kmsService.generateAsymmetricKeyPair();
    const wrappedKeyPair: WrappedKeyPair =
        await kmsService.wrapAsymmetricKeypair(keyPair);
    const ADMIN_USER_ID = "0195dc7c-f315-7881-b35b-da9cbb6ee4a0";
    const adminUser: UsersCreateInput = {
        id: ADMIN_USER_ID,
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

    const adminUserEntity: UserEntity = {
        id: ADMIN_USER_ID,
        username: adminUser.username,
        email: adminUser.email,
        createdAt: new Date(),
        updatedAt: new Date(),
        password: adminUser.password,
        jwtId: Buffer.from(adminUser.jwt_id),
        masterKey: masterKey,
        publicKey: keyPair.publicKey,
        privateKey: keyPair.privateKey,
    };

    console.log(
        `\n✅  Admin user seeded successfully! (${Date.now() - start}ms)`,
    );

    // Admin folders
    start = Date.now();
    const wrappedMediaFolderKey = await kmsService.wrapSymmetricKey(
        adminUserEntity,
        await kmsService.generateRandomSymmetricKey(),
    );
    const folders: FoldersUncheckedCreateInput[] = [
        {
            id: "0195dc7c-f315-7881-b35b-da9cbb6ee4a2",
            name: "Media",
            user_id: adminUserEntity.id,
            type: FolderTypes.MEDIA,
            folder_key: wrappedMediaFolderKey,
        },
    ];

    await idSeed(prisma.folders, folders, false);
    console.log(
        `\n✅  Admin folders seeded successfully! (${Date.now() - start}ms)`,
    );

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
