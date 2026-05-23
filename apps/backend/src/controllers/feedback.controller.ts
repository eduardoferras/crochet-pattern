import { addFeedbackJob } from "@jobs/feedback.job.ts";
import type { FeedbackSchema } from "@validations/feedback.validation.ts";
import type { Request, Response } from "express";

export class FeedbackController {
	sendFeedback = async (req: Request, res: Response) => {
		try {
			const data: FeedbackSchema = req.body;

			await addFeedbackJob(data);

			return res
				.status(200)
				.json({ message: "Feedback received", feedback: data.feedback });
		} catch (error) {
			console.error("Error sending feedback:", error);

			return res
				.status(500)
				.json({ message: "Internal server error sending feedback" });
		}
	};
}

export const feedbackController = new FeedbackController();
