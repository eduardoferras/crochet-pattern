import { idColumn } from "@databases/drizzle/helpers/columns.helpers.ts";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const jwks = pgTable("jwks", {
	id: idColumn(),
	publicKey: text().notNull(),
	privateKey: text().notNull(),
	createdAt: timestamp({ withTimezone: true }).notNull(),
	expiresAt: timestamp({ withTimezone: true }),
});
