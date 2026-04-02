import { env } from "@config/env.config.ts";
import * as schema from "@db/schemas/index.ts";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const clientPostgres = postgres({
	prepare: false,
	ssl: env.DB_CA ? { ca: env.DB_CA, rejectUnauthorized: true } : false,
	host: env.DB_HOST,
	port: env.DB_PORT,
	user: env.DB_USERNAME,
	password: env.DB_PASSWORD,
	database: env.DB_DATABASE,
});

const db = drizzle(clientPostgres, { schema, casing: "snake_case" });

export default db;
