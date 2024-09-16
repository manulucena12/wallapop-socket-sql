import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import "dotenv/config";
import { databaseConnection } from "./database";
import cors from "cors";
import { queries } from "./database/queries";
import authRouter from "./routes/auth";
import productRouter from "./routes/products";

const app = express();
const server = createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/products", productRouter);

server.listen(PORT, () => {
  io.on("connection", () => console.log("Sockets ready"));
  databaseConnection();
  queries();
  console.log("Listening on http://localhost:3002");
});
