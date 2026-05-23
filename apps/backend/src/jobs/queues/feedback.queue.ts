import redisConnection from "@config/redis.ts";
import { QUEUES } from "@constants/queue.constant.ts";
import { BaseQueue } from "@queues/base.queue.ts";

export class FeedbackQueue extends BaseQueue {
	constructor() {
		super(QUEUES.FEEDBACK.NAME, {
			connection: redisConnection,
		});
	}
}
