import {IsNotEmpty, IsString, Length} from "class-validator";

export class ChangeUsernameDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 30)
    username: string;
}
