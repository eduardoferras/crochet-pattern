import { EmailNotifier } from "@services/notifications/email.notifier.ts";
import type { INotification } from "@/interfaces/notification.interface.ts";
import type { NotifierType } from "@/types/notifier.type.ts";

export class NotifierFactory {
	private readonly notifiers = {
		email: new EmailNotifier(),
	} satisfies Record<NotifierType, INotification<unknown>>;

	create(type: NotifierType): (typeof this.notifiers)[NotifierType] {
		const notifier = this.notifiers[type];

		if (!notifier) {
			throw new Error(`Unsupported notifier type: ${type}`);
		}

		return notifier;
	}
}
