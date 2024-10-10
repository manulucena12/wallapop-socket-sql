import { client } from "../src/database";
import { api } from "./app.test";

export const testingMesssages = () => {
  describe("Testing messages", () => {
    let senderId: number;
    let receiverId: number;
    let chatId: number;
    let messageId: number;

    beforeAll(async () => {
      const senderResult = await client.query(
        "INSERT INTO users (username, fullname, passwordhash, avatar) VALUES ($1, $2, $3, $4) RETURNING id",
        ["sender_user", "Sender User", "hashedpassword3", "sender_avatar.png"],
      );
      senderId = senderResult.rows[0].id;

      const receiverResult = await client.query(
        "INSERT INTO users (username, fullname, passwordhash, avatar) VALUES ($1, $2, $3, $4) RETURNING id",
        [
          "receiver_user",
          "Receiver User",
          "hashedpassword4",
          "receiver_avatar.png",
        ],
      );
      receiverId = receiverResult.rows[0].id;

      const chatResult = await client.query(
        "INSERT INTO chats (seller, interested, product) VALUES ($1, $2, $3) RETURNING id",
        [senderId, receiverId, "Iphone 15"],
      );
      chatId = chatResult.rows[0].id;
    });

    it("should create a new message", async () => {
      const messageData = {
        sender: senderId,
        content: "Hello, this is a test message",
        chat: chatId,
      };

      await api
        .post("/messages")
        .send(messageData)
        .expect(201)
        .then((response) => {
          expect(response.body).toHaveProperty("id");
          expect(response.body).toHaveProperty("sender", senderId);
          expect(response.body).toHaveProperty("content", messageData.content);
          expect(response.body).toHaveProperty("chat", chatId);
          messageId = response.body.id;
        });
    });

    it("should delete a message", async () => {
      await api.delete(`/messages/${messageId}`).expect(204);

      const result = await client.query(
        "SELECT * FROM messages WHERE id = $1",
        [messageId],
      );
      expect(result.rows.length).toBe(0);
    });

    it("should return 400 if missing data when creating a message", async () => {
      const invalidMessageData = {
        sender: senderId,
      };

      await api
        .post("/messages")
        .send(invalidMessageData)
        .expect(400)
        .then((response) => {
          expect(response.body).toBe("Missing data");
        });
    });

    it("should return 400 if there is no message for the given id", async () => {
      await api
        .delete("/messages/9999")
        .expect(400)
        .then((response) => {
          expect(response.body).toBe("This message does not exist");
        });
    });
  });
};
