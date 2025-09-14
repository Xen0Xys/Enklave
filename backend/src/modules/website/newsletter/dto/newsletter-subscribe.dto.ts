import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class NewsletterSubscribeDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
