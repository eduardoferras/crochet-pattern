import redisConnection from "@config/redis.ts";
import { QUEUES } from "@constants/queue.constant.ts";
import { BaseQueue } from "@queues/base.queue.ts";

class AuthQueue extends BaseQueue {
	constructor() {
		super(QUEUES.AUTH.NAME, {
			connection: redisConnection,
		});
	}
}

export const authQueue = new AuthQueue();
