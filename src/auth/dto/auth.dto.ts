import { IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({
    example: "test",
    description: "username",
  })
  @IsString()
  readonly username: string;

  @ApiProperty({
    example: "Vin Chang",
    description: "name",
    required: false,
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: "p@ssw0rd",
    description: "password",
  })
  @IsString()
  @MinLength(8)
  readonly password: string;
}

export class LoginDto {
  @ApiProperty({
    example: "test",
    description: "username",
    required: true,
  })
  @IsString()
  readonly username: string;

  @ApiProperty({
    example: "p@ssw0rd",
    description: "password",
    required: true,
  })
  @IsString()
  readonly password: string;
}
