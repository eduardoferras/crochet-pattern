import redisConnection from "@config/redis.ts";
import { QUEUES } from "@constants/queue.constant.ts";
import { FeedbackNotificationEmail } from "@rdc/transactional";
import { render } from "@react-email/render";
import sendEmail from "@services/mail.service.ts";
import type { FeedbackSchema } from "@validations/feedback.validation.ts";
import { BaseWorker } from "@workers/base.worker.ts";
import type { Job } from "bullmq";

export class FeedbackWorker extends BaseWorker {
	constructor() {
		super(QUEUES.FEEDBACK.NAME, {
			connection: redisConnection,
		});
	}

	async consumerSendFeedbackEmail(data: FeedbackSchema) {
		const { screenshot, feedback, type } = data;

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
	}

	async process(job: Job<FeedbackSchema>) {
		try {
			console.log(
				`🤖 [Worker] Aguardando novos jobs na fila ${QUEUES.FEEDBACK.NAME} ...`,
			);
			switch (job.name) {
				case QUEUES.FEEDBACK.JOBS.SEND_EMAIL: {
					await this.consumerSendFeedbackEmail(job.data);
					break;
				}

				default:
					console.warn(`[FeedbackWorker] No handler for job name: ${job.name}`);
			}
		} catch (error) {
			console.error(
				`[FeedbackWorker] Error processing Job ${job.id} - (${job.name}):`,
				error,
			);

			throw error;
		}
	}
}
