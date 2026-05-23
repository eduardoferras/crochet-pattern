import { databaseConfig } from "@config/database.config.ts";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/infra/databases/drizzle/schemas/index.ts",
	out: "./src/infra/databases/drizzle/migrations",
	dialect: "postgresql",
	dbCredentials: databaseConfig,
	migrations: {
		schema: "public",
	},
	casing: "snake_case",
});
