import type CreateFeedbackUseCase from "@usecases/feedback/create-feedback.usecase.ts";
import type { FeedbackSchema } from "@validations/feedback.validation.ts";
import type { Request, Response } from "express";

export class FeedbackController {
	constructor(readonly createFeedback: CreateFeedbackUseCase) {}

	async create(req: Request, res: Response) {
		try {
			const data: FeedbackSchema = req.body;
			await this.createFeedback.execute(data);

			return res
				.status(200)
				.json({ message: "Feedback received", feedback: data.feedback });
		} catch (error) {
			console.error("Error sending feedback:", error);

			return res
				.status(500)
				.json({ message: "Internal server error sending feedback" });
		}
	}
}
