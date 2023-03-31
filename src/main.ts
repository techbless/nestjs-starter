import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as session from "express-session";
import * as passport from "passport";
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import { AllExceptionsFilter } from "./filters/all.exception.filter";
import { HttpStatus, ValidationPipe } from "@nestjs/common";
import CustomError from "./common/custom.error";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn"],
  });

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.useGlobalPipes(
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

  app.use(cookieParser());
  app.use(compression());
  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3000);
}

bootstrap();
