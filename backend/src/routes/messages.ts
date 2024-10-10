import { Router } from "express";
import {
  createMessage,
  deleteMessage,
  getMessage,
  updateMessage,
} from "../handlers/messages";

const messagesRouter = Router();

messagesRouter.post("/", createMessage);

messagesRouter.delete("/:id", deleteMessage);

messagesRouter.get("/:id", getMessage);

messagesRouter.put("/", updateMessage);

export default messagesRouter;
