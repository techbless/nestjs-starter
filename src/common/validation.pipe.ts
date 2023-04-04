import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import CustomError from "./custom.error";

export class Validation {
  private app: INestApplication;

  constructor(app: INestApplication) {
    this.app = app;
    this.setDtoGlobalPipes();
  }

  private setDtoGlobalPipes() {
    this.app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        exceptionFactory: errors => {
          let message = "";

          for (const error of errors) {
            Object.entries(error.constraints).forEach(([key, value]) => {
              message += value += ". ";
            });
          }

          return new CustomError(HttpStatus.BAD_REQUEST, "Invalid Input", message);
        },
      }),
    );
  }
}
