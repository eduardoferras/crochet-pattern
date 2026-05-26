import { env } from "@configs/env.config.ts";
import { Resend } from "resend";
import type { INotification } from "@/interfaces/notification.interface.ts";
import type { EmailPayload } from "@/types/email.type.ts";

export class EmailNotifier implements INotification {
	private resend: Resend;

	constructor() {
		this.resend = new Resend(env.RESEND_API_KEY);
	}

	async send(message: EmailPayload): Promise<void> {
		try {
			const { body, from, ...rest } = message;

			const response = await this.resend.emails.send({
				...rest,
				from: from || env.MAIL_SENDER,
				html: body,
			});

			if (response.error) {
				throw new Error(`Resend error: ${response.error.message}`);
			}
		} catch (error) {
			console.error("[EmailNotifier] Error sending email:", error);
			throw error;
		}
	}
}
