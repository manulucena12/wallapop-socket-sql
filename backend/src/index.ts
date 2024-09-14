import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import "dotenv/config";
import { databaseConnection } from "./database";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(cors());

server.listen(PORT, () => {
  io.on("connection", () => console.log("Sockets ready"));
  databaseConnection();
  console.log("Listening on http://localhost:3002");
});
