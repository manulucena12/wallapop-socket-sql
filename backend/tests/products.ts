import { api } from "./app.test";

export const testingProducts = () => {
  describe("Testing products", () => {
    let userId = "";
    let productId = "";

    beforeAll(async () => {
      const newUser = {
        username: "product-user-example",
        password: "my-product-password",
        name: "Product",
        lastName: "Tester",
      };

      await api.post("/auth/signup").send(newUser).expect(201);

      const loginResponse = await api
        .post("/auth/signin")
        .send({
          username: "product-user-example",
          password: "my-product-password",
        })
        .expect(200);
      userId = loginResponse.body.id;
    });

    it("Creating a product works properly", async () => {
      const newProduct = {
        name: "Test Product",
        description: "A description for the test product",
        condition: "new",
        category: "electronics",
        location: "New York",
        price: 200,
        photo: "https://example.com/photo.jpg",
        user_id: userId,
      };

      const response = await api.post("/products").send(newProduct).expect(201);

      productId = response.body.id;

      expect(response.body.name).toBe(newProduct.name);
      expect(response.body.description).toBe(newProduct.description);
    });

    it("Fetching all products works properly", async () => {
      const response = await api.get("/products").expect(200);

      expect(response.body.length).toBeGreaterThan(0);
    });

    it("Fetching a product by ID works properly", async () => {
      const response = await api.get(`/products/${productId}`).expect(200);

      expect(response.body.id).toBe(productId);
    });

    it("Fetching products by user ID works properly", async () => {
      const response = await api.get(`/products/user/${userId}`).expect(200);

      expect(response.body.length).toBeGreaterThan(0);
    });

    it("Updating a product works properly", async () => {
      const updatedProduct = {
        name: "Updated Test Product",
        description: "Updated description",
        condition: "used",
        category: "furniture",
        location: "Los Angeles",
        price: 150,
        photo: "https://example.com/updated-photo.jpg",
        user_id: userId,
        id: productId,
      };

      const response = await api
        .put("/products")
        .send(updatedProduct)
        .expect(201);

      expect(response.body.name).toBe(updatedProduct.name);
      expect(response.body.description).toBe(updatedProduct.description);
    });

    it("Deleting a product works properly", async () => {
      await api
        .post("/products/delete")
        .send({ productId, userId })
        .expect(204);
    });

    afterAll(async () => {
      await api
        .post("/auth/signout")
        .send({
          username: "product-user-example",
          password: "my-product-password",
        })
        .expect(204);
    });
  });
};
