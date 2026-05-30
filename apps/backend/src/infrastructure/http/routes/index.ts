import authRouter from "@routes/auth.route.ts";
import feedbackRouter from "@routes/feedback.routes.ts";
import healthRouter from "@routes/health.routes.ts";
import productRouter from "@routes/product.routes.ts";
import type { Application } from "express";

export class AppRoutes {
	constructor(private readonly app: Application) {}

	initializeAuthRoutes() {
		this.app.use("/auth", authRouter);
	}

	initializeRoutes() {
		this.app.use("/health", healthRouter);
		this.app.use("/products", productRouter);
		this.app.use("/feedback", feedbackRouter);
	}
}
