import { QUEUES } from "@constants/queue.constant.ts";
import redisConnection from "@databases/redis/index.ts";
import { FeedbackNotificationEmail } from "@rdc/transactional";
import { render } from "@react-email/render";
import { NotifierFactory } from "@services/notifications/notifier.factory.ts";
import type { FeedbackSchema } from "@validations/feedback.validation.ts";
import { BaseWorker } from "@workers/base.worker.ts";
import type { Job } from "bullmq";

export class FeedbackWorker extends BaseWorker {
	private readonly notifierFactory: NotifierFactory;

	constructor(notifierFactory?: NotifierFactory) {
		super(QUEUES.FEEDBACK.NAME, {
			connection: redisConnection,
		});

		this.notifierFactory = notifierFactory || new NotifierFactory();
	}

	private consumerSendFeedbackEmail = async (data: FeedbackSchema) => {
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

		const messagePayload = {
			to: "eduardo@ftndigital.com.br",
			subject: "Feedback Recebido - Receitas de Crochê",
			body: htmlBody,
			attachments,
		};

		const notifier = this.notifierFactory.create("email");
		await notifier.send(messagePayload);
	};

	async process(job: Job<FeedbackSchema>) {
		try {
			console.log(`[FeedbackWorker] Processing Job ${job.id} - ${job.name}`);

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
