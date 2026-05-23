import redisConnection from "@config/redis.ts";
import { QUEUES } from "@constants/queue.constant.ts";
import { PasswordResetEmail } from "@rdc/transactional";
import { render } from "@react-email/render";
import sendEmail from "@services/mail.service.ts";
import { BaseWorker } from "@workers/base.worker.ts";
import type { Job } from "bullmq";
import type { ResetPasswordPayload } from "@/types/auth.types.ts";

export class AuthWorker extends BaseWorker {
	constructor() {
		super(QUEUES.AUTH.NAME, {
			connection: redisConnection,
		});
	}

	private consumerPasswordReset = async (data: ResetPasswordPayload) => {
		const { url, user } = data;

		const htmlBody = await render(
			PasswordResetEmail({ resetLink: url, userEmail: user.email }),
		);

		await sendEmail({
			to: user.email,
			subject: "Redefinição de Senha - Receitas de Crochê",
			body: htmlBody,
		});
	};

	async process(job: Job) {
		try {
			console.log("🤖 [Worker] Aguardando novos jobs na fila de e-mails...");
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
				`[AuthWorker] Error processing Job ${job.id} (${job.name}):`,
				error,
			);

			throw error;
		}
	}
}
