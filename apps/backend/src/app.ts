import path from "node:path";
import { fileURLToPath } from "node:url";
import routes from "@routes/index.ts";
import cors from "cors";
import express, { type Application } from "express";
import "@/workers/index.ts";
import { corsOptions } from "@config/cors.config.ts";
import { initCrons } from "@crons/index.ts";
import authRouter from "@routes/auth.route.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class App {
	public readonly express: Application;

	constructor() {
		this.express = express();
		this.express.use(cors(corsOptions));

		this.initializeAuth();
		this.initializeMiddlewares();
		this.initializeRoutes();
		this.initializeStaticFiles();
		initCrons();
	}

	private initializeAuth(): void {
		this.express.use("/auth", authRouter);
	}

	private initializeMiddlewares(): void {
		this.express.use(express.json({ limit: "5mb" }));
		this.express.use(express.urlencoded({ limit: "5mb", extended: true }));
	}

	private initializeRoutes(): void {
		this.express.use(routes);
	}

	private initializeStaticFiles(): void {
		this.express.use(express.static(path.join(__dirname, "../public")));
	}

	public listen(port: number): void {
		this.express.listen(port, "0.0.0.0", () => {
			console.log(`Server running on port ${port}`);
		});
	}
}
