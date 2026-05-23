import { type JobsOptions, Queue, type QueueOptions } from "bullmq";

export abstract class BaseQueue {
	protected queue: Queue;
	constructor(queueName: string, options: QueueOptions) {
		this.queue = new Queue(queueName, { ...options });
	}

	async addJob(name: string, data: unknown, options?: JobsOptions) {
		return this.queue.add(name, data, { ...options });
	}
}
