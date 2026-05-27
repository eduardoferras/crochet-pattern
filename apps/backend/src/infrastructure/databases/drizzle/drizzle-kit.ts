import { databaseConfig } from "@configs/database.config.ts";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/infrastructure/databases/drizzle/schemas/index.ts",
	out: "./src/infrastructure/databases/drizzle/migrations",
	dialect: "postgresql",
	dbCredentials: databaseConfig,
	migrations: {
		schema: "public",
	},
	casing: "snake_case",
});
