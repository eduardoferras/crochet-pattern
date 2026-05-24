import { databaseConfig } from "@config/database.config.ts";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/db/schemas/index.ts",
	out: "./src/db/migrations",
	dialect: "postgresql",
	dbCredentials: databaseConfig,
	migrations: {
		schema: "public",
	},
	casing: "snake_case",
});
