import type { IEventBus } from "@application/events/event-bus.ts";
import { type JobsOptions, Queue, type QueueOptions } from "bullmq";

export class BullMqAdapter implements IEventBus {
	protected queue: Queue;

	constructor(queueName: string, options: QueueOptions) {
		this.queue = new Queue(queueName, { ...options });
	}

	async publish(
		event: string,
		data: unknown,
		options?: JobsOptions,
	): Promise<void> {
		await this.queue.add(event, data, { ...options });
	}
}
