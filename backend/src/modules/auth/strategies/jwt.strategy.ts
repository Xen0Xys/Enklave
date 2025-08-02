import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import {UserEntity} from "../../users/entities/user.entity";
import {UsersService} from "../../users/users.service";
import {ExtractJwt, Strategy} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";
import {JwtPayload} from "jsonwebtoken";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        if (!process.env.APP_SECRET)
            throw new Error("APP_SECRET environment variable is not set");
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.APP_SECRET,
            issuer: process.env.APP_NAME,
            algorithms: ["HS512"],
        });
    }

    async validate(payload: JwtPayload): Promise<UserEntity> {
        if (!payload.sub || !payload.jti)
            throw new UnauthorizedException("Invalid token payload");
        const user: UserEntity = await this.usersService.getUserById(
            payload.sub,
        );
        if (!user) throw new NotFoundException("User not found");
        if (user.jwtId.toHex() !== payload.jti)
            throw new UnauthorizedException("Invalid token id");
        return user;
    }
}
