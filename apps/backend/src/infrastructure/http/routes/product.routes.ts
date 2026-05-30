import { productController } from "@controllers/product.controller.ts";
import { Router } from "express";

const productRouter = Router();

productRouter.get("/", productController.getAllProducts);

export default productRouter;
