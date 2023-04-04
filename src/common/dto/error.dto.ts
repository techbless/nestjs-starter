import { ApiProperty } from "@nestjs/swagger";

export class ErrorDto {
  @ApiProperty({
    example: "401",
    description: "status code",
  })
  statusCode: number;

  @ApiProperty({
    example: "Error",
    description: "Error Message (ex. Unauthorized)",
  })
  message: string;

  @ApiProperty({
    example: "Please check something",
    description: "Additional info of the error",
  })
  additionalInfo: string;

  @ApiProperty({
    example: "2023-00-00T12:30:00.000Z",
    description: "The time when the error occurred",
  })
  timestamp: string;

  @ApiProperty({
    example: "/auth/me",
    description: "The path where the error occurred",
  })
  path: string;
}
