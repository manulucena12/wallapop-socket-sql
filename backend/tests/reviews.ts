import { client } from "../src/database";
import { api } from "./app.test";

export const testingReviews = () => {
  describe("Testing reviews", () => {
    let userIdReviewer: number;
    let userIdReviewed: number;
    let reviewId: number;
    beforeAll(async () => {
      const userResult = await client.query(
        "INSERT INTO users (username, fullname, avatar, passwordhash) VALUES ('reviewer', 'Test User', 'avatar.png', '1234') RETURNING id",
      );
      userIdReviewer = userResult.rows[0].id;
      const userResult2 = await client.query(
        "INSERT INTO users (username, fullname, avatar, passwordhash) VALUES ('reviewed', 'Test User', 'avatar.png', '1234') RETURNING id",
      );
      userIdReviewed = userResult2.rows[0].id;
    });

    it("Creating a review works properly", async () => {
      const newReview = {
        content: "This is a test review",
        grade: 5,
        reviewer: userIdReviewer,
        reviewed: userIdReviewed,
      };

      await api
        .post("/reviews")
        .send(newReview)
        .expect(201)
        .then((response) => {
          reviewId = response.body.id;
          expect(response.body.content).toBe("This is a test review");
          expect(response.body.grade).toBe(5);
        });
    });

    it("Creating a review with missing data returns 400", async () => {
      const incompleteReview = {
        content: "Incomplete review",
        grade: 4,
      };

      await api.post("/reviews").send(incompleteReview).expect(400);
    });

    it("Fetching user reviews works properly", async () => {
      await api
        .get(`/reviews/${userIdReviewed}`)
        .expect(200)
        .then((response) => {
          expect(response.body.length).toBeGreaterThan(0);
          expect(response.body[0].content).toBe("This is a test review");
        });
    });

    it("Fetching review by ID works properly", async () => {
      await api
        .get(`/reviews/single/${reviewId}`)
        .expect(200)
        .then((response) => {
          expect(response.body.content).toBe("This is a test review");
        });
    });

    it("Updating a review works properly", async () => {
      const updatedReview = {
        content: "Updated review content",
        grade: 4,
      };

      await api
        .put(`/reviews/${reviewId}`)
        .send(updatedReview)
        .expect(200)
        .then((response) => {
          expect(response.body.content).toBe("Updated review content");
          expect(response.body.grade).toBe(4);
        });
    });

    it("Updating a review with missing data returns 400", async () => {
      const incompleteReviewUpdate = {
        content: "This is incomplete",
      };

      await api
        .put(`/reviews/${reviewId}`)
        .send(incompleteReviewUpdate)
        .expect(400);
    });

    it("Deleting a review works properly", async () => {
      await api.delete(`/reviews/${reviewId}/${userIdReviewer}`).expect(204);
    });

    it("Deleting a non-existing review returns 400", async () => {
      await api.delete(`/reviews/99999/${userIdReviewer}`).expect(400);
    });

    it("Trying to delete another user's review returns 400", async () => {
      const newReview = {
        content: "This review will be deleted by another user",
        grade: 3,
        reviewer: userIdReviewer,
        reviewed: userIdReviewed,
      };
      await api.post("/reviews").send(newReview).expect(201);
      await api.delete(`/reviews/${reviewId}/${userIdReviewed}`).expect(400);
    });
  });
};
