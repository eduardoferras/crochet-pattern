import { timestamps } from "@db/helpers/columns.helpers.ts";
import { accounts } from "@db/schemas/index.ts";
import { relations } from "drizzle-orm";
import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { v7 as uuidv7 } from "uuid";

export const users = pgTable("users", {
	id: text().primaryKey(),
	publicId: uuid()
		.$defaultFn(() => uuidv7())
		.notNull()
		.unique(),
	name: text().notNull(),
	email: text().notNull().unique(),
	emailVerified: boolean().default(false).notNull(),
	image: text(),
	...timestamps,
});

export const usersRelations = relations(users, ({ many }) => ({
	accounts: many(accounts),
}));
