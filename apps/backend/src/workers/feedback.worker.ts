import redisConnection from "@config/redis.ts";
import { QUEUES } from "@constants/queue.constant.ts";
import { FeedbackNotificationEmail } from "@rdc/transactional";
import { render } from "@react-email/render";
import sendEmail from "@services/mail.service.ts";
import type { FeedbackSchema } from "@validations/feedback.validation.ts";
import { type Job, Worker } from "bullmq";

export class FeedbackWorker {
	private worker: Worker;
	constructor() {
		this.worker = new Worker(QUEUES.FEEDBACK, this.process, {
			connection: redisConnection,
		});
	}

	async shutdown() {
		await this.worker.close();
	}

	private process = async (job: Job<FeedbackSchema>) => {
		const { screenshot, feedback, type } = job.data;

		const htmlBody = await render(
			FeedbackNotificationEmail({ feedback, type }),
		);

		const attachments = [];
		if (screenshot) {
			attachments.push({
				filename: "screenshot.jpeg",
				content: Buffer.from(screenshot.split(",")[1], "base64"),
			});
		}

		try {
			await sendEmail({
				to: "eduardo@ftndigital.com.br",
				subject: "Feedback Recebido - Receitas de Crochê",
				body: htmlBody,
				attachments,
			});
		} catch (error) {
			console.error("Error processing feedback job:", error);
			throw error;
		}
	};
}
