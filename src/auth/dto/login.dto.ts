import { Transform } from "class-transformer";
import { IsEmail, IsString, Min, MinLength } from "class-validator";

export class LoginDto {
    @IsEmail()
    email: string;

    @MinLength(6)
    @IsString()
    @Transform(({ value }) => value.trim())
    password: string;
}