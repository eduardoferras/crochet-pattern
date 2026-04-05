import { idColumn, idType, timestamps } from "@db/helpers/columns.helpers.ts";
import { users } from "@db/schemas/index.ts";
import { relations } from "drizzle-orm";
import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const accounts = pgTable(
	"accounts",
	{
		id: idColumn().primaryKey(),
		userId: idType().references(() => users.id, { onDelete: "cascade" }),
		accountId: text().notNull(),
		providerId: text().notNull(),
		accessToken: text(),
		refreshToken: text(),
		idToken: text(),
		accessTokenExpiresAt: timestamp({
			withTimezone: true,
		}),
		refreshTokenExpiresAt: timestamp({
			withTimezone: true,
		}),
		scope: text(),
		password: text(),
		...timestamps,
	},
	(table) => [index("accounts_user_id_idx").on(table.userId)],
);

export const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, {
		fields: [accounts.userId],
		references: [users.id],
	}),
}));
