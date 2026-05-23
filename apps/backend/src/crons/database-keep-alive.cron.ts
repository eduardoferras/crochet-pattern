import db from "@databases/index.ts";
import { sql } from "drizzle-orm";
import cron from "node-cron";

export default function databaseKeepAlive() {
	// Runs at midnight, every 6 days
	cron.schedule("0 0 */6 * *", async () => {
		const timestamp = new Date().toISOString();

		try {
			await db.execute(sql`SELECT 1`);

			console.log(
				`[DB-Cron] Keep-alive success: Supabase is active at ${timestamp}`,
			);
		} catch (error) {
			console.error(`[DB-Cron] Keep-alive failed at ${timestamp}:`, error);
		}
	});
}
