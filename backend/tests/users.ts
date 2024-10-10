import { client } from "../src/database";
import { User } from "../src/types/auth";
import { api } from "./app.test";

export const testingUsers = () => {
  describe("Testing users endpoints", () => {
    let createdUserId: number;

    beforeAll(async () => {
      const result = await client.query(
        "INSERT INTO users (username, fullname, passwordhash, avatar) VALUES ($1, $2, $3, $4) RETURNING id",
        ["testuser", "Test User", "hashedpassword", "testavatar.png"],
      );
      createdUserId = result.rows[0].id;
    });

    it("Get all users returns users properly", async () => {
      await api
        .get("/users")
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBe(true);
          expect(response.body.length).toBeGreaterThan(0);
          response.body.forEach((user: User) => {
            expect(user).toHaveProperty("id");
            expect(user).toHaveProperty("username");
            expect(user).toHaveProperty("fullname");
            expect(user).toHaveProperty("avatar");
          });
        });
    });

    it("Get user by ID returns user data properly", async () => {
      await api
        .get(`/users/${createdUserId}`)
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveProperty("id", createdUserId);
          expect(response.body).toHaveProperty("username", "testuser");
          expect(response.body).toHaveProperty("fullname", "Test User");
          expect(response.body).toHaveProperty("avatar", "testavatar.png");
          expect(response.body).toHaveProperty("password");
        });
    });

    it("Get user by ID returns 400 for non-existing user", async () => {
      const nonExistentUserId = 9999999;
      await api
        .get(`/users/${nonExistentUserId}`)
        .expect(400)
        .then((response) => {
          expect(response.text).toBe("User not found");
        });
    });

    it("Get user by ID returns 400", async () => {
      await api
        .get("/users/invalidId")
        .expect(400)
        .then((response) => {
          expect(response.text).toBe("Internal server error");
        });
    });
  });
};
