import { databaseConfig } from "@config/database.config.ts";
import * as schema from "@db/schemas/index.ts";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const clientPostgres = postgres({
	prepare: false,
	...databaseConfig,
});

const db = drizzle(clientPostgres, { schema, casing: "snake_case" });

export default db;
