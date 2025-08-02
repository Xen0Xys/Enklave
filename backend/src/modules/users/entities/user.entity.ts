import {Exclude} from "class-transformer";

export class UserEntity {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;

    @Exclude()
    password: string;
    @Exclude()
    jwtId: Buffer;
    @Exclude()
    masterKey: CryptoKey;
    @Exclude()
    publicKey: CryptoKey;
    @Exclude()
    privateKey: CryptoKey;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
