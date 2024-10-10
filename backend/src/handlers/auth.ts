import { Request, Response } from "express-serve-static-core";
import brcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../types/auth";
import { client } from "../database";

export const signup = async (req: Request, res: Response) => {
  const { username, password, name, lastName } = req.body;
  if (!username || !password || !name || !lastName) {
    return res.status(400).json("Missing username or password");
  }
  const users = await client.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  if (users.rows.length !== 0) {
    return res.status(400).json("Username already exists");
  }
  const passwordHash = await brcrypt.hash(password, 10);
  const avatar = `https://avatar.iran.liara.run/username?username=${name}+${lastName}`;
  const fullName = `${name}${" "}${lastName}`;
  try {
    await client.query(
      `INSERT INTO users (username, passwordhash, fullname, avatar) VALUES ($1, $2, $3, $4)`,
      [username, passwordHash, fullName, avatar],
    );
    return res.status(201).json("User created");
  } catch (e) {
    console.error(e);
    return res.status(500).json("User has not been created");
  }
};

export const signin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json("Missing username or password");
  }
  const { rows } = await client.query(
    "SELECT * FROM users WHERE username = $1;",
    [username],
  );
  const user: User = rows[0];
  if (rows.length === 0 || !user.passwordhash) {
    return res.status(400).json("Username or password incorrect");
  }
  const isCorrect = await brcrypt.compare(password, user.passwordhash);
  if (!isCorrect) {
    return res.status(400).json("Username or password incorrect");
  }
  const { SECRET_WORD } = process.env;
  if (!SECRET_WORD) {
    return res.status(500).json("Internal server error");
  }
  try {
    const token = jwt.sign(username, SECRET_WORD);
    return res.status(200).json({ username, token, id: user.id });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const signout = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json("Missing username or password");
  }
  const { rows } = await client.query(
    "SELECT * FROM users WHERE username = $1;",
    [username],
  );
  const user: User = rows[0];
  if (rows.length === 0 || !user.passwordhash) {
    return res.status(400).json("Username or password incorrect");
  }
  const isCorrect = await brcrypt.compare(password, user.passwordhash);
  if (!isCorrect) {
    return res.status(400).json("Username or password incorrect");
  }
  try {
    await client.query("DELETE FROM products WHERE user_id = $1", [user.id]);
    await client.query(
      "DELETE FROM reviews WHERE reviewer = $1 OR reviewed = $1",
      [user.id],
    );
    await client.query("DELETE FROM users WHERE username = $1", [username]);
    return res.status(204).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const signupdate = async (req: Request, res: Response) => {
  const { username, password, name, lastName, id } = req.body;
  if (!username || !password || !name || !lastName || !id) {
    return res.status(400).json("Missing username or password");
  }
  const { rows } = await client.query(
    "SELECT username, passwordhash FROM users WHERE id = $1",
    [id],
  );
  let passwordHash = "";
  if (rows[0].passwordhash === password) {
    passwordHash = password;
  } else {
    passwordHash = await brcrypt.hash(password, 10);
  }
  if (rows[0].username !== username) {
    const { rows } = await client.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
    );
    if (rows.length !== 0) {
      return res.status(400).json("Username already taken");
    }
  }
  const avatar = `https://avatar.iran.liara.run/username?username=${name}+${lastName}`;
  const fullName = `${name}${" "}${lastName}`;
  try {
    await client.query(
      `UPDATE users SET username= $1, passwordHash = $2, fullname = $3, avatar = $4 WHERE id = $5`,
      [username, passwordHash, fullName, avatar, id],
    );
    return res.status(200).json("User updated");
  } catch (e) {
    console.error(e);
    return res.status(500).json("User has not been created");
  }
};
