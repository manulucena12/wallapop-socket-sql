import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import "dotenv/config";
import { databaseConnection } from "./database";
import cors from "cors";
import { queries } from "./database/queries";
import authRouter from "./routes/auth";
import productRouter from "./routes/products";
import usersRouter from "./routes/users";
import reviewsRouter from "./routes/reviews";
import chatsRouter from "./routes/chats";
import messagesRouter from "./routes/messages";
import likesRouter from "./routes/likes";

export const app = express();
export const server = createServer(app);
export const io = new Server(server, { cors: { origin: "*" } });
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/users", usersRouter);
app.use("/reviews", reviewsRouter);
app.use("/chats", chatsRouter);
app.use("/messages", messagesRouter);
app.use("/likes", likesRouter);

server.listen(PORT, async () => {
  await databaseConnection();
  await queries();
  console.log(`Listening on http://localhost:${PORT}`);
});
