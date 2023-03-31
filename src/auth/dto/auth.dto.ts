import { IsString, MinLength } from "class-validator";

export class RegisterDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly name: string;

  @IsString()
  @MinLength(8)
  readonly password: string;
}

export class LoginDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
