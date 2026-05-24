import type { BetterAuthOptions } from "better-auth";

export type ResetPasswordPayload =
	NonNullable<
		NonNullable<
			Required<BetterAuthOptions>["emailAndPassword"]
		>["sendResetPassword"]
	> extends (...args: infer P) => any
		? P[0]
		: never;
