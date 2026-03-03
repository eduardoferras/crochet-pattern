import { z } from "zod";

const envSchema = z
	.object({
		PORT: z.coerce.number().default(3002),
		SERVER_URL: z.url().default("http://localhost:3002"),
		FRONTEND_URL: z.url().default("http://localhost:3000"),
		MAIL_SENDER: z.string(),
		RESEND_API_KEY: z.string(),
		BETTER_AUTH_SECRET: z.string(),
		NODE_ENV: z.enum(["development", "production"]).default("development"),
		REDIS_URL: z.string(),
		DB_HOST: z.string(),
		DB_PORT: z.coerce.number(),
		DB_USERNAME: z.string(),
		DB_PASSWORD: z.string(),
		DB_DATABASE: z.string(),

		DB_CA: z
			.string()
			.optional()
			.transform((val) => val?.replace(/\\n/g, "\n")),
		PGADMIN_USERNAME: z.string().optional(),
		PGADMIN_PASSWORD: z.string().optional(),
	})
	.transform((data) => ({
		...data,
		BETTER_AUTH_URL: data.SERVER_URL,
	}))
	.superRefine((data, ctx) => {
		if (data.NODE_ENV === "production") {
			if (!data.DB_CA || data.DB_CA.trim() === "") {
				ctx.addIssue({
					code: "custom",
					message: "DB_CA (SSL certificate) is required in production",
					path: ["DB_CA"],
				});
			}
		}
	});

export const env = envSchema.parse(process.env);
