import { idColumn } from "@db/helpers/columns.helpers.ts";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const jwks = pgTable("jwks", {
	id: idColumn().primaryKey(),
	publicKey: text().notNull(),
	privateKey: text().notNull(),
	createdAt: timestamp({ withTimezone: true }).notNull(),
	expiresAt: timestamp({ withTimezone: true }),
});
