import request from "supertest";
import { app } from "../../src/app";
import { database } from "../../src/lib/mysql/db";

let postId: number; 

describe("GET /posts", () => {
  it("should return a list of posts", async () => {
    const response = await request(app).get("/posts");
    console.log("GET /posts response:", response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toBeInstanceOf(Array);
    response.body.data.forEach((post: any) => {
      expect(post).toHaveProperty("id");
      expect(post).toHaveProperty("title");
      expect(post).toHaveProperty("description");
      expect(post).toHaveProperty("content");
      expect(post).toHaveProperty("author");
      expect(post).toHaveProperty("subject");
      expect(post).toHaveProperty("modifiedDate");
      expect(post).toHaveProperty("createdDate");
    });
  });
});



// POST

describe("POST /posts", () => {
  it("should be able to create a new post", async () => {
    const newPostData = {
      title: "Title test",
      description: "Test description",
      content: "Test content",
      author: "Test author",
      subject: "Test subject",
    };

    const response = await request(app).post("/posts").send(newPostData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body.data).toHaveProperty("title", newPostData.title);
    expect(response.body.data).toHaveProperty("description", newPostData.description);
    expect(response.body.data).toHaveProperty("content", newPostData.content);
    expect(response.body.data).toHaveProperty("author", newPostData.author);
    expect(response.body.data).toHaveProperty("subject", newPostData.subject);
    expect(response.body.data).toHaveProperty("modifiedDate");
    expect(response.body.data).toHaveProperty("createdDate");

    postId = response.body.data.id;
  });

  it("should return 400 if any required field is missing", async () => {
    const incompletePostData = {
      title: "Test Title",
      description: "Test Description",
      author: "Test Author",
      subject: "Test Subject",
    };

    const response = await request(app).post("/posts").send(incompletePostData);
    console.log("POST /posts response:", response.body);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("success", false);
    expect(response.body).toHaveProperty("error", "All fields are required.");
  });

  it("should return 500 if there is a server error", async () => {
    jest.spyOn(database, "getConnection").mockImplementationOnce(() => {
      throw new Error("Database connection error");
    });

    const newPostData = {
      title: "Test Title",
      description: "Test Description",
      content: "Test Content",
      author: "Test Author",
      subject: "Test Subject",
    };

    const response = await request(app).post("/posts").send(newPostData);
    console.log("POST /posts response:", response.body);

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("success", false);
    expect(response.body).toHaveProperty("error", "Failed to create post");
  });
});

describe("GET /posts/:id", () => {
    it("should return a single post", async () => {
      const response = await request(app).get(`/posts/${postId}`);
      console.log(`GET /posts/${postId} response:`, response.body);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("success", true);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("id", postId);
      expect(response.body.data).toHaveProperty("title");
      expect(response.body.data).toHaveProperty("description");
      expect(response.body.data).toHaveProperty("content");
      expect(response.body.data).toHaveProperty("author");
      expect(response.body.data).toHaveProperty("subject");
      expect(response.body.data).toHaveProperty("modifiedDate");
      expect(response.body.data).toHaveProperty("createdDate");
    });
  
    it("should return 404 if the post is not found", async () => {
      const nonExistentPostId = 99999; // Um ID que não existe
      const response = await request(app).get(`/posts/${nonExistentPostId}`);
      console.log(`GET /posts/${nonExistentPostId} response:`, response.body);
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("success", false);
      expect(response.body).toHaveProperty("error", "Post not found");
    });
  });

afterAll(async () => {
  await database.closePool(); 
});
