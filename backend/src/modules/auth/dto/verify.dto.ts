import {IsNotEmpty, IsString, IsUUID} from "class-validator";

export class VerifyDto {
    @IsNotEmpty()
    @IsString()
    @IsUUID(4)
    token: string;
}
