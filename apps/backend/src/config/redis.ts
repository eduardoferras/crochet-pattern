import { env } from "@config/env.config.ts";
import { Redis } from "ioredis";

const redisConnection = new Redis(env.REDIS_URL, {
	maxRetriesPerRequest: null,
	enableReadyCheck: false,
});

export default redisConnection;
