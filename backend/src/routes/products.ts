import { Router } from "express";
import {
  deleteProduct,
  getAllProducts,
  getProductById,
  getUsersProducts,
  postProduct,
  updateProduct,
} from "../handlers/products";

const productRouter = Router();

productRouter.get("/", getAllProducts);

productRouter.get("/:id", getProductById);

productRouter.get("/user/:id", getUsersProducts);

productRouter.post("/", postProduct);

productRouter.post("/delete", deleteProduct);

productRouter.put("/", updateProduct);

export default productRouter;
