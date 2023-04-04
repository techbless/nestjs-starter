import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as passport from "passport";
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import { AllExceptionsFilter } from "./filters/all.exception.filter";
import { SwaggerAPIDocumentation } from "./common/swagger.ducument";
import { RedisSession } from "./common/redis.session";
import { Validation } from "./common/validation.pipe";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn"],
  });

  await new RedisSession(app).setRedisStore();
  new Validation(app);
  app.use(cookieParser());
  app.use(compression());
  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalFilters(new AllExceptionsFilter());

  new SwaggerAPIDocumentation(app, "docs");
  await app.listen(3000);
}

bootstrap();
