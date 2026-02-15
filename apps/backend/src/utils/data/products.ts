import { env } from "@config/env.config.ts";
import type Product from "@/types/product.types.ts";

const products: Product[] = [
	{
		id: 0,
		name: "Amigurumi South Park - Pip Pirrip",
		price: 20,
		image: `${env.SERVER_URL}/images/products/amigurumi-south-park-pip-pirrip.jpg`,
		seller: {
			name: "Nicole",
		},
	},
	{
		id: 1,
		name: "Amigurumi Deadpool",
		price: 20,
		image: `${env.SERVER_URL}/images/products/amigurumi-deadpool.jpg`,
		seller: {
			name: "Nicole",
		},
	},
	{
		id: 2,
		name: "Boneca de Formatura",
		price: 20,
		image: `${env.SERVER_URL}/images/products/boneca-formatura.jpg`,
		seller: {
			name: "Nicole",
		},
	},
	{
		id: 3,
		name: "Boneca Personalizada",
		price: 20,
		image: `${env.SERVER_URL}/images/products/boneca-personalizada.jpg`,
		seller: {
			name: "Nicole",
		},
	},
	{
		id: 4,
		name: "Amigurumi Frieren Chibi",
		price: 20,
		image: `${env.SERVER_URL}/images/products/amigurumi-frieren-chibi.jpg`,
		seller: {
			name: "Nicole",
		},
	},
];

export default products;
