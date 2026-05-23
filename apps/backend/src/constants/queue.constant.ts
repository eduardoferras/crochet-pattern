export const QUEUES = {
	FEEDBACK: {
		NAME: "feedback-queue",
		JOBS: {
			SEND_EMAIL: "send-feedback-email",
		},
	},
	AUTH: {
		NAME: "auth-queue",
		JOBS: {
			PASSWORD_RESET: "password-reset",
		},
	},
} as const;

export type QueueNames = (typeof QUEUES)[keyof typeof QUEUES];
