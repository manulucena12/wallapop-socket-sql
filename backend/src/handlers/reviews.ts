import { Request, Response } from "express-serve-static-core";
import { Review } from "../types/reviews";
import { client } from "../database";

export const getUserReviews = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { rows } = await client.query(
      "SELECT * FROM reviews WHERE reviewed = $1",
      [id],
    );
    return res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const getReviewById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { rows } = await client.query("SELECT * FROM reviews WHERE id = $1", [
      id,
    ]);
    return res.status(200).json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const createReview = async (
  req: Request<NonNullable<unknown>, NonNullable<unknown>, Review>,
  res: Response,
) => {
  const { content, grade, reviewer, reviewed } = req.body;
  if (!content || !grade || !reviewer || !reviewed) {
    return res.status(400).json("Missing data");
  }
  const { rows } = await client.query(
    "SELECT * FROM users WHERE id = $1 OR id = $2",
    [reviewer, reviewed],
  );
  if (rows.length < 2) {
    return res.status(400).json("Some or all users do not exist");
  }
  try {
    const { rows } = await client.query(
      "INSERT INTO reviews (content, grade, reviewer, reviewed) VALUES ($1, $2, $3, $4) RETURNING *",
      [content, grade, reviewer, reviewed],
    );
    return res.status(201).json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  const { reviewId, userId } = req.params;
  const { rows } = await client.query("SELECT * FROM reviews WHERE id = $1", [
    reviewId,
  ]);
  if (rows.length === 0) {
    return res.status(400).json("This review does not exist");
  }
  const review: Review = rows[0];
  if (review.reviewer !== Number(userId)) {
    return res.status(400).json("You cannot delete this review");
  }
  try {
    await client.query("DELETE FROM reviews WHERE id = $1", [reviewId]);
    return res.status(204).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const updateReview = async (
  req: Request<{ id: number }, NonNullable<unknown>, Review>,
  res: Response,
) => {
  const { content, grade } = req.body;
  const { id } = req.params;
  if (!content || !grade) {
    return res.status(400).json("Missing data");
  }
  try {
    const { rows } = await client.query(
      "UPDATE reviews SET grade = $1, content = $2 WHERE id = $3 RETURNING *",
      [grade, content, id],
    );
    return res.status(200).json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};
