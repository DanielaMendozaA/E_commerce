import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @IsString()
  @MinLength(1)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  password: string;


}
