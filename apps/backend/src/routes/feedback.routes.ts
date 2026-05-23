import { feedbackController } from "@controllers/feedback.controller.ts";
import validateBody from "@middlewares/validateBody.middleware.ts";
import { feedbackZodSchema } from "@validations/feedback.validation.ts";
import { Router } from "express";

const feedbackRouter = Router();

feedbackRouter.post(
	"/",
	validateBody(feedbackZodSchema),
	feedbackController.sendFeedback,
);

export default feedbackRouter;
