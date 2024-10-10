import supertest from "supertest";
import { app, io, server } from "../src";
import { testingAuth } from "./auth";
import { client } from "../src/database";
import { testingProducts } from "./products";
import { testingReviews } from "./reviews";
import { testingChats } from "./chats";
import { testingMesssages } from "./messages";
import { testingLikes } from "./likes";

export const api = supertest(app);

describe("Testing app", () => {
  testingAuth();
  testingProducts();
  testingReviews();
  testingChats();
  testingMesssages();
  testingLikes();
});

afterAll(async () => {
  await client.query("DELETE FROM likes;");
  await client.query("DELETE FROM messages;");
  await client.query("DELETE FROM chats;");
  await client.query("DELETE FROM products;");
  await client.query("DELETE FROM reviews;");
  await client.query("DELETE FROM users;");
  console.log("Database cleaned");
  server.close();
  io.close();
  await client.end();
});
