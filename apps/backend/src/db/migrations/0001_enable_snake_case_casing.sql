ALTER TABLE "users" DROP CONSTRAINT "users_public_id_unique";--> statement-breakpoint
DROP INDEX "accounts_userId_idx";--> statement-breakpoint
CREATE INDEX "accounts_user_id_idx" ON "accounts" USING btree ("user_id");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_publicId_unique" UNIQUE("public_id");