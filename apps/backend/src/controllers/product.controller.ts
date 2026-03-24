import products from "@utils/data/products.ts";
import type { Request, Response } from "express";

export const getAllProducts = async (_req: Request, res: Response) => {
	res.json({ data: products });
};
