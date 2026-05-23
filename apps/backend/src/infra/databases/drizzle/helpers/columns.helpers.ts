import { timestamp, uuid } from "drizzle-orm/pg-core";
import { v7 as uuidv7 } from "uuid";

export const timestamps = {
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
	deletedAt: timestamp("deleted_at", { withTimezone: true }),
};

export const idType = (name?: string) => uuid(name || "");

export const idColumn = (name?: string) =>
	idType(name || "")
		.primaryKey()
		.$default(() => uuidv7());
