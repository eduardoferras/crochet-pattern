export const QUEUES = {
	FEEDBACK: "feedback-queue",
	AUTH: {
		NAME: "auth-queue",
		JOBS: {
			PASSWORD_RESET: "password-reset",
		},
	},
} as const;

export type QueueNames = (typeof QUEUES)[keyof typeof QUEUES];
