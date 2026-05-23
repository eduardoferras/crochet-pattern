import {
	type ProductService,
	productService,
} from "@services/product.service.ts";

import type { Request, Response } from "express";

export class ProductController {
	constructor(private productService: ProductService) {}

	getAllProducts = async (_req: Request, res: Response) => {
		const data = await this.productService.getAllProducts();
		res.json(data);
	};
}

export const productController = new ProductController(productService);
