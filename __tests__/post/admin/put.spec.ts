import request from "supertest";
import { app } from "../../../src/app";
import { database } from "../../../src/lib/mysql/db";

describe("PUT /posts/:id", () => {
  it("should be able to update an existing post", async () => {
    const postId = 1;
    const updatedPostData = {
      title: "Updated Title",
      description: "Updated Description",
      content: "Updated Content",
      author: "Updated Author",
      subject: "Updated Subject",
    };

    const response = await request(app)
      .put(`/posts/${postId}`)
      .send(updatedPostData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty(
      "message",
      "Post updated successfully"
    );
  });

  it("should be able to return 400 if the input data is invalid", async () => {
    const postId = 1;
    const invalidPostData = {
      title: "",
      description: "Invalid Description",
      content: "Invalid Content",
      author: "Invalid Author",
      subject: "Invalid Subject",
    };

    const response = await request(app)
      .put(`/posts/${postId}`)
      .send(invalidPostData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("success", false);
    expect(response.body).toHaveProperty("error", "Invalid input data.");
  });

  it("should be able to return 404 if the post is not found", async () => {
    const nonExistentPostId = 99999;
    const updatedPostData = {
      title: "Title",
      description: "Description",
      content: "Content",
      author: "Author",
      subject: "Subject",
    };

    const response = await request(app)
      .put(`/posts/${nonExistentPostId}`)
      .send(updatedPostData);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("success", false);
    expect(response.body).toHaveProperty("error", "Post not found");
  });

  it("should be able to return 500 if there is a server error", async () => {
    const postId = 1;
    jest
      .spyOn(database.poolInstance, "getConnection")
      .mockImplementationOnce(() => {
        throw new Error("Database connection error");
      });

    const updatedPostData = {
      title: "Title",
      description: "Description",
      content: "Content",
      author: "Author",
      subject: "Subject",
    };

    const response = await request(app)
      .put(`/posts/${postId}`)
      .send(updatedPostData);

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("success", false);
    expect(response.body).toHaveProperty("error", "Failed to update post");
  });

  afterAll(async () => {
    await database.closePool();
  });
});
