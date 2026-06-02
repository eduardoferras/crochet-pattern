import { feedbackController } from "@controllers/index.ts";
import { RequestValidatorMiddleware } from "@middlewares/request-validator.middleware.ts";
import { feedbackZodSchema } from "@validations/feedback.validation.ts";
import { Router } from "express";

const feedbackRouter = Router();

feedbackRouter.post(
	"/",
	RequestValidatorMiddleware.body(feedbackZodSchema),
	(req, res) => feedbackController.create(req, res),
);

export default feedbackRouter;
