import { Router } from "express";
import { createChat, getChat, getUserChats, hideChat } from "../handlers/chats";

const chatsRouter = Router();

chatsRouter.post("/", createChat);

chatsRouter.get("/user/:id", getUserChats);

chatsRouter.get("/:id", getChat);

chatsRouter.put("/", hideChat);

export default chatsRouter;
