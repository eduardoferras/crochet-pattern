import type { NextFunction, Request, Response } from "express";
import type { ZodObject } from "zod";

// biome-ignore lint/complexity/noStaticOnlyClass : This class is designed to be used as a static utility for validating request bodies
export class RequestValidatorMiddleware {
	static body(schema: ZodObject) {
		return (req: Request, res: Response, next: NextFunction) => {
			const result = schema.safeParse(req.body);

			if (result.success) {
				next();
			} else {
				const errorsMessages = result.error.issues.map((issue) => ({
					path: issue.path.join("."),
					message: issue.message,
					code: issue.code,
				}));

				res
					.status(400)
					.json({ message: "Dados inválidos", errors: errorsMessages });
			}
		};
	}
}
