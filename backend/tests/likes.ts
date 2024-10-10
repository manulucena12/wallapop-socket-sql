import { client } from "../src/database";
import { api } from "./app.test";

export const testingLikes = () => {
  let productId: number;
  let userId: number;
  let userId2: number;
  beforeAll(async () => {
    const userResult = await client.query(
      "INSERT INTO users (username, fullname, avatar, passwordhash) VALUES ('testlikesuser', 'Test User', 'avatar.png', '1234') RETURNING id",
    );
    userId = userResult.rows[0].id;

    const userResult2 = await client.query(
      "INSERT INTO users (username, fullname, avatar, passwordhash) VALUES ('testlikesuser2', 'Test User 2', 'avatar2.png', '1234') RETURNING id",
    );
    userId2 = userResult2.rows[0].id;

    const productResult = await client.query(
      "INSERT INTO products (name, description, price, user_id, condition, location, category, photo) VALUES ('Test Product', 'A test product', 100, $1, 'New', 'Seville', 'Informatics', 'photo') RETURNING id",
      [userId],
    );
    productId = productResult.rows[0].id;
  });

  describe("Testing likes", () => {
    it("should return 201 when a product is liked", async () => {
      const response = await api
        .post("/likes")
        .send({ product: productId, likedby: userId2 })
        .expect(201);

      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("product", productId);
      expect(response.body).toHaveProperty("likedby", userId2);
    });

    it("should return 400 if trying to like a product already liked", async () => {
      const response = await api
        .post("/likes")
        .send({ product: productId, likedby: userId2 })
        .expect(400);

      expect(response.body).toBe("You already liked this product");
    });

    it("should return 400 if user tries to like their own product", async () => {
      const response = await api
        .post("/likes")
        .send({ product: productId, likedby: userId })
        .expect(400);

      expect(response.body).toBe("You cannot like your own products");
    });

    it("should return 400 if data is missing", async () => {
      const response = await api
        .post("/likes")
        .send({ product: productId })
        .expect(400);
      expect(response.body).toBe("Missing data");
    });

    it("should return 204 when a product is unliked", async () => {
      await api.delete(`/likes/${productId}/${userId2}`).expect(204);
    });

    it("should return 400 if trying to unlike a product that wasn't liked", async () => {
      const response = await api
        .delete(`/likes/${productId}/${userId2}`)
        .expect(400);

      expect(response.body).toBe("You did not like this product");
    });

    it("should return 404 if parameters are missing", async () => {
      await api.delete(`/likes/${productId}/`).expect(404);
    });

    it("should return a list of likes for the given product", async () => {
      await client.query(
        "INSERT INTO likes (likedby, product) VALUES ($1, $2)",
        [userId2, productId],
      );
      const response = await api.get(`/likes/${productId}`).expect(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toHaveProperty("product", productId);
      expect(response.body[0]).toHaveProperty("likedby", userId2);
    });

    it("should return 404 if no product ID is provided", async () => {
      await api.get("/likes/").expect(404);
    });

    it("should return a list of products liked by the user", async () => {
      const response = await api.get(`/likes/user/${userId2}`).expect(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toHaveProperty("id", productId);
      expect(response.body[0]).toHaveProperty("name", "Test Product");
    });
  });
};
