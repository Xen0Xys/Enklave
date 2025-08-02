import {Users} from "../../../prisma/generated/client";
import {UserEntity} from "./entities/user.entity";
import {KmsService} from "../kms/kms.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class UsersService {
    constructor(private readonly kmsService: KmsService) {}

    async toUser(user: Users): Promise<UserEntity> {
        const masterKey: CryptoKey = await this.kmsService.unwrapMasterKey(
            Buffer.from(user.master_key),
        );
        const keyPair: CryptoKeyPair =
            await this.kmsService.unwrapAsymmetricKeypair({
                wrappedPublicKey: Buffer.from(user.public_key),
                wrappedPrivateKey: Buffer.from(user.private_key),
            });
        return new UserEntity({
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            jwtId: Buffer.from(user.jwt_id),
            createdAt: user.created_at,
            updatedAt: user.updated_at,
            masterKey,
            publicKey: keyPair.publicKey,
            privateKey: keyPair.privateKey,
        });
    }
}
