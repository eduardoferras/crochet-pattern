import { redisStorage } from "@better-auth/redis-storage";
import { env } from "@config/env.config.ts";
import redisConnection from "@config/redis.ts";
import { QUEUES } from "@constants/queue.constant.ts";
import db from "@db/index.ts";
import { authQueue } from "@queues/auth.queue.ts";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { jwt, openAPI } from "better-auth/plugins";
import { localization } from "better-auth-localization";

export const auth = betterAuth({
	trustedOrigins: [env.FRONTEND_URL],
	...(env.NODE_ENV === "production" && {
		advanced: {
			useSecureCookies: true,
			defaultCookieAttributes: {
				secure: true,
				sameSite: "None",
				path: "/",
			},
			crossSubDomainCookies: {
				enabled: true,
				domain: "receitasdecroche.com.br",
			},
		},
	}),
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
			await authQueue.addJob(QUEUES.AUTH.JOBS.PASSWORD_RESET, {
				user,
				url,
			});
		},
	},
});
