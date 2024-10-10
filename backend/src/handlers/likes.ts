import { Request, Response } from "express-serve-static-core";
import { client } from "../database";

export const likeProduct = async (req: Request, res: Response) => {
  const { product, likedby } = req.body;
  if (!product || !likedby) {
    return res.status(400).json("Missing data");
  }
  const { rows } = await client.query(
    "SELECT user_id FROM products WHERE id = $1",
    [product],
  );
  if (rows[0].user_id === likedby) {
    return res.status(400).json("You cannot like your own products");
  }
  const { rows: likes } = await client.query(
    "SELECT likedby FROM likes WHERE product = $1",
    [product],
  );
  const alreadyLiked = likes.some((l) => l.likedby === likedby);
  if (alreadyLiked) {
    return res.status(400).json("You already liked this product");
  }
  try {
    const { rows } = await client.query(
      "INSERT INTO likes (likedby, product) VALUES ($1, $2) RETURNING *",
      [likedby, product],
    );
    return res.status(201).json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const dislike = async (req: Request, res: Response) => {
  const { likedby, product } = req.params;
  if (!likedby || !product) {
    return res.status(400).json("Missing data");
  }
  const { rows } = await client.query("SELECT FROM likes WHERE product = $1", [
    product,
  ]);
  const isLiked = rows.some((l) => (l.likedby = likedby));
  if (!isLiked) {
    return res.status(400).json("You did not like this product");
  }
  try {
    await client.query(
      "DELETE FROM likes WHERE likedby = $1 AND product = $2",
      [likedby, product],
    );
    return res.status(204).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const getProductLikes = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json("Missing data");
  }
  try {
    const { rows } = await client.query(
      "SELECT * FROM likes WHERE product = $1",
      [id],
    );
    return res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const getUserFavourites = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json("Missing data");
  }
  try {
    const { rows } = await client.query(
      "SELECT * FROM likes INNER JOIN products ON likes.product = products.id WHERE likedby = $1",
      [id],
    );
    return res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};
