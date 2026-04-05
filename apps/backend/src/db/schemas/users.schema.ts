import { idColumn, timestamps } from "@db/helpers/columns.helpers.ts";
import { accounts } from "@db/schemas/index.ts";
import { relations } from "drizzle-orm";
import { boolean, pgTable, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: idColumn().primaryKey(),
	name: text().notNull(),
	email: text().notNull().unique(),
	emailVerified: boolean().default(false).notNull(),
	image: text(),
	...timestamps,
});

export const usersRelations = relations(users, ({ many }) => ({
	accounts: many(accounts),
}));
