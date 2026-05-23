export const QUEUES = {
	FEEDBACK: "feedback-queue",
	AUTH: "auth-queue",
} as const;

export type QueueNames = (typeof QUEUES)[keyof typeof QUEUES];
