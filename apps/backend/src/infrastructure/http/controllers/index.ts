import { QUEUES } from "@constants/queue.constant.ts";
import { FeedbackController } from "@controllers/feedback.controller.ts";
import redisConnection from "@databases/redis/index.ts";
import { BullMqAdapter } from "@messaging/bullmq/bullmq.adapter.ts";
import CreateFeedbackUseCase from "@usecases/feedback/create-feedback.usecase.ts";

const feedbackQueue = new BullMqAdapter(QUEUES.FEEDBACK.NAME, {
	connection: redisConnection,
});

const createFeedbackUseCase = new CreateFeedbackUseCase(feedbackQueue);
const feedbackController = new FeedbackController(createFeedbackUseCase);

export { feedbackController, createFeedbackUseCase };
