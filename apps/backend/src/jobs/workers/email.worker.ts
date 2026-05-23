import redisConnection from "@config/redis.ts";
import sendEmail from "@services/mail.service.ts";
import { type Job, Worker } from "bullmq";
import type EmailPayload from "@/types/email.types.ts";

new Worker(
	"emailQueue",
	async (job: Job<EmailPayload>) => {
		try {
			const { to, subject, body, attachments } = job.data;

			await sendEmail({
				to,
				subject,
				body,
				attachments,
			});

			console.log(`Email sent to ${to} with subject "${subject}"`);
		} catch (error) {
			console.error("Error processing email job:", error);
			throw error;
		}
	},
	{
		connection: redisConnection,
		limiter: {
			max: 2,
			duration: 1000,
		},
	},
);
