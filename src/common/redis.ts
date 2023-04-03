import * as redis from "redis";

class RedisClient {
  private redisClient;
  private legacyRedisClient;

  constructor() {
    this.redisClient = null;
    this.legacyRedisClient = null;
  }

  public async getRedisClient() {
    if (this.redisClient) {
      return this.redisClient;
    }

    const REDIS_URL = process.env.REDIS_URL;
    this.redisClient = redis.createClient({
      url: REDIS_URL,
      legacyMode: false,
    });

    await this.redisClient.connect();

    return this.redisClient;
  }

  public async getLegacyRedisClient() {
    if (this.legacyRedisClient) {
      return this.redisClient;
    }

    const REDIS_URL = process.env.REDIS_URL;
    this.legacyRedisClient = redis.createClient({
      url: REDIS_URL,
      legacyMode: true,
    });

    await this.legacyRedisClient.connect();

    return this.legacyRedisClient;
  }
}

export default new RedisClient();
