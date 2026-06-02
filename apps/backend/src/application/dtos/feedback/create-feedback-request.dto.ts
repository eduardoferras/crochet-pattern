import type { feedbackZodSchema } from "@validations/feedback.validation.ts";
import type z from "zod";

export type CreateFeedbackRequest = z.infer<typeof feedbackZodSchema>;
