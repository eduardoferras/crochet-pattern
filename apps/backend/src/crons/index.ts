import registerDatabaseKeepAlive from "./database-keep-alive.cron.ts";
import registerHealthCron from "./health-check.cron.ts";

export function initCrons() {
	registerHealthCron();
	registerDatabaseKeepAlive();
}
