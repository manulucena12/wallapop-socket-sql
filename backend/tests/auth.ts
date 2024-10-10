import { client } from "../src/database";
import { api } from "./app.test";

export const testingAuth = () => {
  describe("Testing auth", () => {
    it("Registering works properly", async () => {
      const newUser = {
        username: "my-user-example",
        password: "my-example-password",
        name: "User",
        lastName: "Example",
      };
      await api.post("/auth/signup").send(newUser).expect(201);
    });
    it("Registering with a created user causes 400", async () => {
      const newUser = {
        username: "my-user-example",
        password: "my-example-password",
        name: "User",
        lastName: "Example",
      };
      await api.post("/auth/signup").send(newUser).expect(400);
    });
    it("Login works properly and gives token", async () => {
      const userToLog = {
        username: "my-user-example",
        password: "my-example-password",
      };
      await api
        .post("/auth/signin")
        .send(userToLog)
        .expect(200)
        .then((response) => {
          expect(typeof response === "object").toBeTruthy();
          expect(response.body.token).toBeTruthy();
        });
    });
    it("Login with wrong credentials causes 400", async () => {
      const userToLog = {
        username: "my-user-exampl",
        password: "my-example-password",
      };
      await api.post("/auth/signin").send(userToLog).expect(400);
    });
    it("Updating user works properly", async () => {
      const { rows } = await client.query(
        "SELECT * FROM users WHERE username = $1",
        ["my-user-example"],
      );
      const id = rows[0].id;
      const userToUpdate = {
        name: "Update",
        lastName: "User",
        username: "my-user-example",
        password: "my-example-password",
        id,
      };
      await api
        .put("/auth/signupdate")
        .send(userToUpdate)
        .expect(200)
        .then((response) => {
          expect(response.body).toBe("User updated");
        });
    });
    it("Deleting user works properly", async () => {
      const userToLog = {
        username: "my-user-example",
        password: "my-example-password",
      };
      await api.post("/auth/signout").send(userToLog).expect(204);
    });
  });
};
