import { IsString } from "class-validator";

export class RegisterDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly password: string;
}

export class LoginDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
