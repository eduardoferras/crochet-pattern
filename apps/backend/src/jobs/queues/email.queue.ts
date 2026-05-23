import { Queue } from "bullmq";
import redisConnection from "@/config/redis.ts";

const emailQueue = new Queue("emailQueue", { connection: redisConnection });

export default emailQueue;
