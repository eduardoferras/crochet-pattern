import { feedbackController } from "@controllers/feedback.controller.ts";
import { RequestValidatorMiddleware } from "@middlewares/request-validator.middleware.ts";
import { feedbackZodSchema } from "@validations/feedback.validation.ts";
import { Router } from "express";

const feedbackRouter = Router();

feedbackRouter.post(
	"/",
	RequestValidatorMiddleware.body(feedbackZodSchema),
	feedbackController.create,
);

export default feedbackRouter;
