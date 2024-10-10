import { Request, Response } from "express-serve-static-core";
import { io } from "..";
import { client } from "../database";

export const createMessage = async (req: Request, res: Response) => {
  const { sender, content, chat } = req.body;
  if (!sender || !content || !chat) {
    return res.status(400).json("Missing data");
  }
  try {
    const { rows } = await client.query(
      "INSERT INTO messages (sender, chat, content) VALUES ($1, $2, $3) RETURNING *",
      [sender, chat, content],
    );
    io.emit("New-Message", rows[0]);
    return res.status(201).json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json("Missing data");
  }
  const { rows } = await client.query("SELECT * FROM messages WHERE id = $1", [
    id,
  ]);
  if (rows.length === 0) {
    return res.status(400).json("This message does not exist");
  }
  try {
    await client.query("DELETE FROM messages WHERE id = $1", [id]);
    io.emit("Delete-Message", { id });
    return res.status(204).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const getMessage = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json("Missing data");
  }
  const { rows } = await client.query("SELECT * FROM messages WHERE id = $1", [
    id,
  ]);
  if (rows.length === 0) {
    return res.status(400).json("This message does not exist");
  }
  try {
    const { rows } = await client.query(
      "SELECT * FROM messages WHERE id = $1",
      [id],
    );
    return res.status(200).json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const updateMessage = async (req: Request, res: Response) => {
  const { id, content } = req.body;
  if (!id || !content) {
    return res.status(400).json("Missing data");
  }
  try {
    const { rows } = await client.query(
      "UPDATE messages SET isedited = true, content = $1 WHERE id = $2 RETURNING *",
      [content, id],
    );
    io.emit("Update-Message", rows[0]);
    return res.status(200).json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};
