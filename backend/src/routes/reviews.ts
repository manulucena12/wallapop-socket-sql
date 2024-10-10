import { Router } from "express";
import {
  createReview,
  deleteReview,
  getReviewById,
  getUserReviews,
  updateReview,
} from "../handlers/reviews";

const reviewsRouter = Router();

reviewsRouter.get("/:id", getUserReviews);

reviewsRouter.get("/single/:id", getReviewById);

reviewsRouter.post("/", createReview);

reviewsRouter.delete("/:reviewId/:userId", deleteReview);

reviewsRouter.put("/:id", updateReview);

export default reviewsRouter;
