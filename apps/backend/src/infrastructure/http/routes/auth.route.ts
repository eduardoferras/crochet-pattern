import { auth } from "@auth/index.ts";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { Router } from "express";

const authRouter = Router();

authRouter.get("/me", async (req, res) => {
	const session = await auth.api.getSession({
		headers: fromNodeHeaders(req.headers),
	});
	return res.json(session);
});

authRouter.all("/*splat", toNodeHandler(auth));

export default authRouter;
