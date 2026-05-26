import path from "node:path";
import { fileURLToPath } from "node:url";
import { corsOptions } from "@configs/cors.config.ts";
import { initCrons } from "@crons/index.ts";
import { AppRoutes } from "@routes/index.ts";
import { WorkerRegistry } from "@workers/index.ts";
import cors from "cors";
import express, { type Application } from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class App {
	public readonly app: Application;
	private readonly routes: AppRoutes;

	constructor() {
		this.app = express();
		this.app.use(cors(corsOptions));

		this.routes = new AppRoutes(this.app);

		this.initializeAuthRoutes();
		this.initializeMiddlewares();
		this.initializeRoutes();
		this.initializeStaticFiles();
		new WorkerRegistry();
		initCrons();
	}

	private initializeAuthRoutes(): void {
		this.routes.initializeAuthRoutes();
	}

	private initializeRoutes(): void {
		this.routes.initializeRoutes();
	}

	private initializeMiddlewares(): void {
		this.app.use(express.json({ limit: "5mb" }));
		this.app.use(express.urlencoded({ limit: "5mb", extended: true }));
	}

	private initializeStaticFiles(): void {
		this.app.use(express.static(path.join(__dirname, "../public")));
	}

	public listen(port: number): void {
		this.app.listen(port, "0.0.0.0", () => {
			console.log(`Server running on port ${port}`);
		});
	}
}
