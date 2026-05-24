import redisConnection from "@config/redis.ts";
import { QUEUES } from "@constants/queue.constant.ts";
import { PasswordResetEmail } from "@rdc/transactional";
import { render } from "@react-email/render";
import { NotifierFactory } from "@services/notifications/notifier.factory.ts";
import { BaseWorker } from "@workers/base.worker.ts";
import type { Job } from "bullmq";
import type { ResetPasswordPayload } from "@/types/auth.type.ts";

export class AuthWorker extends BaseWorker {
	private readonly notifierFactory: NotifierFactory;

	constructor(notifierFactory?: NotifierFactory) {
		super(QUEUES.AUTH.NAME, {
			connection: redisConnection,
		});

		this.notifierFactory = notifierFactory || new NotifierFactory();
	}

	private consumerPasswordReset = async (data: ResetPasswordPayload) => {
		const { url, user } = data;

		const htmlBody = await render(
			PasswordResetEmail({ resetLink: url, userEmail: user.email }),
		);

		const messagePayload = {
			to: user.email,
			subject: "Redefinição de Senha - Receitas de Crochê",
			body: htmlBody,
		};

		const notifier = this.notifierFactory.create("email");
		await notifier.send(messagePayload);
	};

	async process(job: Job) {
		try {
			console.log(`[AuthWorker] Processing Job ${job.id} - ${job.name}`);

			switch (job.name) {
				case QUEUES.AUTH.JOBS.PASSWORD_RESET: {
					await this.consumerPasswordReset(job.data);
					break;
				}

				default:
					console.warn(`[AuthWorker] No handler for job name: ${job.name}`);
			}
		} catch (error) {
			console.error(
				`[AuthWorker] Error processing Job ${job.id} - (${job.name}):`,
				error,
			);

			throw error;
		}
	}
}
