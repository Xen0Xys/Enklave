import {UserEntity} from "../../users/entities/user.entity";

export class LoginEntity {
    user: UserEntity;
    token: string;

    constructor(partial: Partial<LoginEntity>) {
        Object.assign(this, partial);
    }
}
