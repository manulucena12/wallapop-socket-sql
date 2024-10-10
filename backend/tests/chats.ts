import { client } from "../src/database";
import { api } from "./app.test";

export const testingChats = () => {
  describe("Testing chats", () => {
    let sellerId: number;
    let interestedId: number;
    let chatId: number;
    let productId: number;

    beforeAll(async () => {
      const sellerResult = await client.query(
        "INSERT INTO users (username, fullname, passwordhash, avatar) VALUES ($1, $2, $3, $4) RETURNING id",
        ["seller_user", "Seller User", "hashedpassword1", "seller_avatar.png"],
      );
      sellerId = sellerResult.rows[0].id;

      const interestedResult = await client.query(
        "INSERT INTO users (username, fullname, passwordhash, avatar) VALUES ($1, $2, $3, $4) RETURNING id",
        [
          "interested_user",
          "Interested User",
          "hashedpassword2",
          "interested_avatar.png",
        ],
      );
      interestedId = interestedResult.rows[0].id;

      const productResult = await client.query(
        "INSERT INTO products (name, description, price, condition, category, user_id, location, photo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
        [
          "Test Product",
          "Test description",
          100,
          "New",
          "Informatics",
          sellerId,
          "Seville",
          "photo.png",
        ],
      );
      productId = productResult.rows[0].id;
    });

    it("should create a new chat", async () => {
      const chatData = {
        seller: sellerId,
        interested: interestedId,
        product: productId,
      };

      await api
        .post("/chats")
        .send(chatData)
        .expect(201)
        .then((response) => {
          expect(response.body.id).toBeDefined();
          expect(response.body.seller).toBeDefined();
          expect(response.body.interested).toBeDefined();
          expect(response.body.product).toBeDefined();
          chatId = response.body.id;
        });
    });

    it("should return all chats for a user (seller or interested)", async () => {
      await api
        .get(`/chats/user/${sellerId}`)
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBe(true);
          expect(response.body.length).toBeGreaterThan(0);
          expect(response.body[0].id).toBeDefined();
          expect(response.body[0].seller).toBeDefined();
          expect(response.body[0].interested).toBeDefined();
        });
    });

    it("should return a chat by ID with its messages", async () => {
      await api
        .get(`/chats/${chatId}`)
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveProperty("data");
          expect(response.body).toHaveProperty("messages");
          expect(response.body.data.id).toBeDefined();
          expect(response.body.data.seller).toBeDefined();
          expect(response.body.data.interested).toBeDefined();
        });
    });

    it("should return 400 if missing data in createChat", async () => {
      const invalidChatData = {
        seller: sellerId,
        product: productId,
      };

      await api
        .post("/chats")
        .send(invalidChatData)
        .expect(400)
        .then((response) => {
          expect(response.body).toBe("Missing data");
        });
    });

    it("should return 400 if invalid chat ID is provided", async () => {
      const invalidChatId = 999999;

      await api
        .get(`/chats/${invalidChatId}`)
        .expect(400)
        .then((response) => {
          expect(response.body).toBe("This chat does not exist");
        });
    });
  });
};
