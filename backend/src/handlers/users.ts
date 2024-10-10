import { Request, Response } from "express-serve-static-core";
import { client } from "../database";
import { User } from "../types/auth";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await client.query(
      "SELECT id, username, fullname, avatar FROM users;",
    );
    return res.status(200).json(users.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    return res.status(400).json("Invalid id");
  }
  try {
    const users = await client.query("SELECT * FROM users WHERE id = $1", [id]);
    if (users.rows.length === 0) {
      return res.status(400).json("User not found");
    }
    const user: User = users.rows[0];
    const uncensoredUser: User = {
      fullname: user.fullname,
      username: user.username,
      password: user.passwordhash,
      avatar: user.avatar,
      id: user.id,
    };
    return res.status(200).json(uncensoredUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};
