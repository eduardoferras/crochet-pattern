import { type FeedbackQueue, feedbackQueue } from "@queues/feedback.queue.ts";
import type { FeedbackSchema } from "@validations/feedback.validation.ts";

export class FeedbackService {
	constructor(private feedbackQueue: FeedbackQueue) {}

	async create(data: FeedbackSchema) {
		try {
			await this.feedbackQueue.dispatch(data);
		} catch (error) {
			console.error("Error creating feedback:", error);
			throw error;
		}
	}
}

export const feedbackService = new FeedbackService(feedbackQueue);
