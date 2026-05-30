import redisConnection from "@databases/redis/index.ts";
import { Router } from "express";

const healthRouter = Router();

healthRouter.get("/", async (_req, res) => {
	try {
		const redisStatus = await redisConnection.ping();
		if (redisStatus) {
			return res.sendStatus(200);
		} else {
			return res.status(500).json({ message: "Redis connection failed" });
		}
	} catch (error) {
		console.error("Health check failed:", error);

		return res.status(500).json({ message: "Health check failed", error });
	}
});

export default healthRouter;
