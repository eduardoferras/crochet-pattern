import { env } from "@config/env.config.ts";
import type { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
	origin: env.FRONTEND_URL,
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
	credentials: true,
	maxAge: 86400,
};
