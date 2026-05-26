import { env } from "@configs/env.config.ts";
import cron from "node-cron";

export default function healthCheck() {
	cron.schedule("*/10 * * * *", async () => {
		try {
			const response = await fetch(`${env.SERVER_URL}/health`);

			if (!response.ok) {
				console.error(`[Health Check] Unhealthy status: ${response.status}`);
			}
		} catch (error) {
			console.error(
				"[Health Check] Service unreachable or network error:",
				error,
			);
		}
	});
}
