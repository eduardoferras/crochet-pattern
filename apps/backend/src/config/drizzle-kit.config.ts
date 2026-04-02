import { env } from "@config/env.config.ts";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/db/schemas/index.ts",
	out: "./src/db/migrations",
	dialect: "postgresql",
	dbCredentials: {
		host: env.DB_HOST,
		port: env.DB_PORT,
		user: env.DB_USERNAME,
		password: env.DB_PASSWORD,
		database: env.DB_DATABASE,
		ssl: env.DB_CA ? { ca: env.DB_CA, rejectUnauthorized: true } : false,
	},
	migrations: {
		schema: "public",
	},
	casing: "snake_case",
});
