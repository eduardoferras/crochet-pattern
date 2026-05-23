import { type Job, Worker, type WorkerOptions } from "bullmq";

export abstract class BaseWorker {
	private worker: Worker;

	constructor(queueName: string, options: WorkerOptions) {
		this.worker = new Worker(queueName, (job) => this.process(job), {
			...options,
		});
	}

	abstract process(job: Job): Promise<void>;

	async shutdown() {
		console.log(`Shutting down ${this.worker.name} Worker...`);
		await this.worker.close();
	}
}
