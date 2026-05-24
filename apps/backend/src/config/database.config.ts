import { env } from "@config/env.config.ts";

export const databaseConfig = {
	host: env.DB_HOST,
	port: env.DB_PORT,
	user: env.DB_USERNAME,
	password: env.DB_PASSWORD,
	database: env.DB_DATABASE,
	ssl: env.DB_CA ? { ca: env.DB_CA, rejectUnauthorized: true } : false,
};
