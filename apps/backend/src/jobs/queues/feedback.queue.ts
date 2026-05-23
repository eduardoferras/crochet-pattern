import redisConnection from "@config/redis.ts";
import { QUEUES } from "@constants/queue.constant.ts";
import type { FeedbackSchema } from "@validations/feedback.validation.ts";
import { Queue } from "bullmq";

export class FeedbackQueue {
	queue: Queue;

	constructor() {
		this.queue = new Queue(QUEUES.FEEDBACK, { connection: redisConnection });
	}

	dispatch = async (data: FeedbackSchema) => {
		try {
			await this.queue.add("send-feedback-email", data, {
				attempts: 3,
				backoff: {
					type: "exponential",
					delay: 2000,
				},
				removeOnComplete: true,
				removeOnFail: false,
			});
		} catch (error) {
			console.error("Error adding feedback job:", error);
			throw error;
		}
	};
}

export const feedbackQueue = new FeedbackQueue();
