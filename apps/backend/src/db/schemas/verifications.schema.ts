import { timestamps } from "@db/helpers/columns.helpers.ts";
import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const verifications = pgTable(
	"verifications",
	{
		id: text().primaryKey(),
		identifier: text().notNull(),
		value: text().notNull(),
		expiresAt: timestamp({ withTimezone: true }).notNull(),
		...timestamps,
	},
	(table) => [index("verifications_identifier_idx").on(table.identifier)],
);
