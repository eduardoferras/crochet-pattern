import {
	idColumn,
	timestamps,
} from "@databases/drizzle/helpers/columns.helpers.ts";
import { accounts } from "@databases/drizzle/schemas/index.ts";
import { relations } from "drizzle-orm";
import { boolean, pgTable, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: idColumn(),
	name: text().notNull(),
	email: text().notNull().unique(),
	emailVerified: boolean().default(false).notNull(),
	image: text(),
	...timestamps,
});

export const usersRelations = relations(users, ({ many }) => ({
	accounts: many(accounts),
}));
