import { Router } from "express";
import {
  dislike,
  getProductLikes,
  getUserFavourites,
  likeProduct,
} from "../handlers/likes";

const likesRouter = Router();

likesRouter.get("/:id", getProductLikes);

likesRouter.get("/user/:id", getUserFavourites);

likesRouter.post("/", likeProduct);

likesRouter.delete("/:product/:likedby", dislike);

export default likesRouter;
