import { Request, Response } from "express-serve-static-core";
import { client } from "../database";
import { io } from "..";
import { Chat } from "../types/chats";

export const createChat = async (req: Request, res: Response) => {
  const { seller, interested, product } = req.body;
  if (!seller || !interested || !product) {
    return res.status(400).json("Missing data");
  }
  try {
    const { rows } = await client.query(
      "INSERT INTO chats (seller, interested, product) VALUES ($1, $2, $3) RETURNING *",
      [seller, interested, product],
    );
    return res.status(201).json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const getUserChats = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json("Missing data");
  }
  try {
    const { rows } = await client.query(
      "SELECT * FROM chats WHERE seller = $1 OR interested = $1",
      [id],
    );
    return res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const getChat = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json("Missing data");
  }
  try {
    const { rows: messages } = await client.query(
      "SELECT * FROM messages WHERE chat = $1",
      [id],
    );
    const { rows: data } = await client.query(
      "SELECT * FROM chats WHERE id = $1",
      [id],
    );
    if (data.length === 0) {
      return res.status(400).json("This chat does not exist");
    }
    io.emit("Chat-Messages", { data: data[0], messages });
    return res.status(200).json({ data: data[0], messages });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const hideChat = async (req: Request, res: Response) => {
  const { chatId, userId } = req.body;
  if (!chatId || !userId) {
    return res.status(400).json("Missing data");
  }
  const { rows } = await client.query("SELECT * FROM chats WHERE id = $1", [
    chatId,
  ]);
  if (rows.length === 0) {
    return res.status(400).json("This chat does not exist");
  }
  const chat: Chat = rows[0];
  const isSeller = Number(userId) === chat.seller ? true : false;
  try {
    if (isSeller) {
      await client.query("UPDATE chats SET sellerview = false WHERE id = $1", [
        chatId,
      ]);
    } else {
      await client.query(
        "UPDATE chats SET interestedview = false WHERE id = $1",
        [chatId],
      );
    }
    return res.status(204).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};
