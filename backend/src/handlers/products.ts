import { Request, Response } from "express-serve-static-core";
import { client } from "../database";
import { Product } from "../types/products";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { rows } = await client.query("SELECT * FROM products;");
    return res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { rows } = await client.query(
      "SELECT * FROM products WHERE id = $1",
      [id],
    );
    return res.status(200).json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const getUsersProducts = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { rows } = await client.query(
      "SELECT * FROM products WHERE user_id = $1",
      [id],
    );
    return res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const postProduct = async (
  req: Request<NonNullable<unknown>, NonNullable<unknown>, Product>,
  res: Response,
) => {
  const {
    name,
    description,
    condition,
    category,
    location,
    price,
    photo,
    user_id,
  } = req.body;
  if (
    !name ||
    !description ||
    !condition ||
    !category ||
    !location ||
    !price ||
    !photo ||
    !user_id
  ) {
    return res.status(400).json("Missing data");
  }
  const { rows: users } = await client.query(
    "SELECT * FROM users WHERE id = $1",
    [user_id],
  );
  if (users.length === 0) {
    return res.status(400).json("This user does not exist");
  }
  try {
    const { rows } = await client.query(
      "INSERT INTO products (name, description, condition, price, category, photo, user_id, location) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [name, description, condition, price, category, photo, user_id, location],
    );
    return res.status(201).json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { productId, userId } = req.body;

  const { rows } = await client.query(
    "SELECT id, user_id FROM products WHERE id = $1",
    [productId],
  );
  if (rows.length === 0) {
    return res.status(400).json("This product does not exist");
  }

  const product: Product = rows[0];
  if (product.user_id !== userId) {
    return res.status(400).json("You cannot delete this product");
  }
  try {
    await client.query("DELETE FROM products WHERE id = $1", [productId]);
    return res.status(204).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};
