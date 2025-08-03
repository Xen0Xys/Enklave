import {Exclude} from "class-transformer";
import {ApiHideProperty} from "@nestjs/swagger";

export class UserEntity {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;

    @Exclude()
    @ApiHideProperty()
    password: string;
    @Exclude()
    @ApiHideProperty()
    jwtId: Buffer;
    @Exclude()
    @ApiHideProperty()
    masterKey: CryptoKey;
    @Exclude()
    @ApiHideProperty()
    publicKey: CryptoKey;
    @Exclude()
    @ApiHideProperty()
    privateKey: CryptoKey;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
