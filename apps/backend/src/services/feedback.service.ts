import { QUEUES } from "@constants/queue.constant.ts";
import { FeedbackQueue } from "@queues/feedback.queue.ts";
import type { FeedbackSchema } from "@validations/feedback.validation.ts";

export class FeedbackService {
	constructor(private feedbackQueue: FeedbackQueue) {}

	async create(data: FeedbackSchema) {
		try {
			return await this.feedbackQueue.addJob(
				QUEUES.FEEDBACK.JOBS.SEND_EMAIL,
				data,
			);
		} catch (error) {
			console.error("Error creating feedback:", error);
			throw error;
		}
	}
}

export const feedbackService = new FeedbackService(new FeedbackQueue());
