import type { IEventBus } from "@application/events/event-bus.ts";
import { QUEUES } from "@constants/queue.constant.ts";
import type { CreateFeedbackRequest } from "@dtos/feedback/create-feedback-request.dto.ts";

export default class CreateFeedbackUseCase {
	constructor(readonly event: IEventBus) {}
	async execute(data: CreateFeedbackRequest): Promise<void> {
		try {
			await this.event.publish(QUEUES.FEEDBACK.JOBS.SEND_EMAIL, data);
		} catch (error) {
			console.error("Error creating feedback:", error);
			throw error;
		}
	}
}
