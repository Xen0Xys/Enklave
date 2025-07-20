import {Injectable} from "@nestjs/common";
import * as crypto from "crypto";

@Injectable()
export default class KmsUtilsService {
    randomBytes(length: number): Buffer {
        return crypto.randomBytes(length);
    }

    async hashPassword(data: Bun.StringOrBuffer): Promise<string> {
        return await Bun.password.hash(data, {
            algorithm: "argon2id",
            timeCost: 12,
        });
    }

    hash(data: string | Buffer): Buffer {
        const hash: crypto.Hash = crypto.createHash("sha256");
        hash.update(data);
        return hash.digest();
    }
}
