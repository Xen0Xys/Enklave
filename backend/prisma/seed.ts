import {SecurityUtilsService} from "../src/modules/security/security-utils.service";
import {WrappedKeyPair} from "../src/modules/security/entities/wrapped-key-pair";
import {SecurityService} from "../src/modules/security/security.service";
import {FoldersUncheckedCreateInput} from "./generated/models/Folders";
import {FolderTypes, KeyTypes} from "./generated/enums";
import {KeysCreateInput} from "./generated/models/Keys";
import {PrismaClient} from "./generated/client";
import {PrismaPg} from "@prisma/adapter-pg";

// initialize Prisma Client
const adapter: PrismaPg = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma: PrismaClient = new PrismaClient({adapter});

const kmsUtilsService: SecurityUtilsService = new SecurityUtilsService();
const kmsService: SecurityService = new SecurityService(kmsUtilsService);

// CONSTANTS
let masterKey: CryptoKey;
let keyPair: CryptoKeyPair;
let mediaKey: CryptoKey;

async function loadConstants() {
    masterKey = await kmsService.generateRandomSymmetricKey();
    keyPair = await kmsService.generateAsymmetricKeyPair();
    mediaKey = await kmsService.generateRandomSymmetricKey();
}

async function generateAdminUserKeys() {
    const wrappedMasterKey: Buffer = await kmsService.wrapMasterKey(masterKey);
    const wrappedKeyPair: WrappedKeyPair =
        await kmsService.wrapAsymmetricKeypair(keyPair);
    const wrappedMediaFolderKey = await kmsUtilsService.wrapCryptoKey(
        mediaKey,
        masterKey,
    );

    const masterKeyEntity: KeysCreateInput = {
        id: "0195dc7c-f315-7881-b35b-da9cbb6ee4a1",
        type: KeyTypes.AES256,
        material: wrappedMasterKey,
    };
    const keyPairEntity: KeysCreateInput = {
        id: "0195dc7c-f315-7881-b35b-da9cbb6ee4a2",
        type: KeyTypes.X25519,
        public_material: wrappedKeyPair.wrappedPublicKey,
        private_material: wrappedKeyPair.wrappedPrivateKey,
    };
    const wrappedMediaFolderKeyEntity: KeysCreateInput = {
        id: "0195dc7c-f315-7881-b35b-da9cbb6ee4a3",
        type: KeyTypes.AES256,
        material: wrappedMediaFolderKey,
    };

    await idSeed(
        prisma.keys,
        [masterKeyEntity, keyPairEntity, wrappedMediaFolderKeyEntity],
        false,
    );
}

async function generateAdminUser() {
    const adminUser = {
        id: "0195dc7c-f315-7881-b35b-da9cbb6ee4a0",
        username: process.env.ADMIN_USERNAME || "admin",
        email: process.env.ADMIN_EMAIL || "admin@admin.com",
        password: await kmsUtilsService.hashPassword(
            process.env.ADMIN_PASSWORD || "password@admin.com",
        ),
        jwt_id: kmsUtilsService.randomBytes(32),
        master_key_id: "0195dc7c-f315-7881-b35b-da9cbb6ee4a1",
        asymmetric_master_key_id: "0195dc7c-f315-7881-b35b-da9cbb6ee4a2",
    };

    await idSeed(prisma.users, [adminUser], false);
}

async function generateAdminFolders() {
    const folders: FoldersUncheckedCreateInput[] = [
        {
            id: "0195dc7c-f315-7881-b35b-da9cbb6ee4a2",
            name: "Media",
            user_id: "0195dc7c-f315-7881-b35b-da9cbb6ee4a0",
            type: FolderTypes.MEDIA,
            folder_key_id: "0195dc7c-f315-7881-b35b-da9cbb6ee4a3",
        },
    ];

    await idSeed(prisma.folders, folders, false);
}

async function main() {
    const gStart = Date.now();

    await loadConstants();

    // Admin keys
    let start = Date.now();
    await generateAdminUserKeys();

    console.log(
        `\n✅  Admin keys seeded successfully! (${Date.now() - start}ms)`,
    );

    // Admin user
    start = Date.now();
    await generateAdminUser();
    console.log(
        `\n✅  Admin user seeded successfully! (${Date.now() - start}ms)`,
    );

    // Admin folders
    start = Date.now();
    await generateAdminFolders();

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
