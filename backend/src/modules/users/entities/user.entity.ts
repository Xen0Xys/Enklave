import {Exclude} from "class-transformer";

export class UserEntity {
    id: string;
    username: string;
    email: string;
    @Exclude()
    password: string;
    @Exclude()
    jwtId: Buffer;
    @Exclude()
    masterKey: Buffer;
    publicKey: Buffer;
    @Exclude()
    privateKey: Buffer;
    createdAt: Date;
    updatedAt: Date;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
