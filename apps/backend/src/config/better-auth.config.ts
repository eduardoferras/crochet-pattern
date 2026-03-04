import { redisStorage } from "@better-auth/redis-storage";
import { env } from "@config/env.config.ts";
import redisConnection from "@config/redis.ts";
import db from "@db/index.ts";
import { PasswordResetEmail } from "@rdc/transactional";
import { render } from "@react-email/render";
import sendEmail from "@services/mail.service.ts";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { jwt, openAPI } from "better-auth/plugins";
import { localization } from "better-auth-localization";

export const auth = betterAuth({
	trustedOrigins: [env.FRONTEND_URL],
	database: drizzleAdapter(db, {
		provider: "pg",
		usePlural: true,
	}),
	secondaryStorage: redisStorage({
		client: redisConnection,
		keyPrefix: "auth:session:",
	}),
	baseURL: env.BETTER_AUTH_URL,
	basePath: "/auth",
	plugins: [
		jwt({
			schema: {
				jwks: {
					modelName: "jwk",
				},
			},
		}),
		openAPI(),
		localization({
			defaultLocale: "pt-BR",
			fallbackLocale: "default",
		}),
	],
	emailAndPassword: {
		enabled: true,
		minPasswordLength: 6,
		sendResetPassword: async ({ user, url }) => {
			const resetPasswordTemplate = await render(
				PasswordResetEmail({ resetLink: url, userEmail: user.email }),
			);

			void sendEmail({
				to: user.email,
				subject: "Redefinição de Senha - Receitas de Crochê",
				body: resetPasswordTemplate,
			});
		},
	},
});
