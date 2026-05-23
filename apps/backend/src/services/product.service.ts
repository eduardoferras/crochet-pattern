import products from "@utils/data/products.ts";
export class ProductService {
	async getAllProducts() {
		return { data: products };
	}
}

export const productService = new ProductService();
