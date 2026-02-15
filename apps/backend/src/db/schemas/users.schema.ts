import { timestamps } from "@db/helpers/columns.helpers.ts";
import { accounts } from "@db/schemas/index.ts";
import { relations, sql } from "drizzle-orm";
import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: text("id").primaryKey(),
	publicId: uuid("public_id").default(sql`uuidv7()`).notNull().unique(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	image: text("image"),
	...timestamps,
});

export const usersRelations = relations(users, ({ many }) => ({
	accounts: many(accounts),
}));
