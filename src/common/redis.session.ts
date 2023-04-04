import { INestApplication } from "@nestjs/common";
import RedisClient from "./redis";
import RedisStore from "connect-redis";
import * as session from "express-session";

export class RedisSession {
  private readonly app: INestApplication;

  constructor(app: INestApplication) {
    this.app = app;
  }

  private async getRedisStore() {
    const redisClient = await RedisClient.getRedisClient();
    return new RedisStore({ client: redisClient });
  }

  public async setRedisStore() {
    const redisStore = await this.getRedisStore();
    this.app.use(
      session({
        store: redisStore,
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
      }),
    );
  }
}
