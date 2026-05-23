import "@workers/feedback.worker.ts";

import { AuthWorker } from "@workers/auth.worker.ts";
import type { BaseWorker } from "@workers/base.worker.ts";

export class WorkerRegistry {
	private instances: BaseWorker[] = [];

	private readonly workers = [
		/*
		TODO: FeedbackWorker, etc.
		*/
		AuthWorker,
	];

	constructor() {
		this.initializeWorkers();
	}

	initializeWorkers(): void {
		console.log("🤖 [Workers] Initialize workers...");

		this.instances = this.workers.map((WorkerClass) => {
			return new WorkerClass();
		});

		console.log(`🚀 [Workers] ${this.instances.length} workers actives.`);
	}

	async shutdownAll(): Promise<void> {
		console.log("🛑 [Workers] Shutting down all workers...");
		await Promise.all(this.instances.map((worker) => worker.shutdown()));
	}
}
