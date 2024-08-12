import request from "supertest";
import { app } from "../../../src/app";
import { database } from "../../../src/lib/mysql/db";

describe("PUT /posts/admin/update/:id", () => {
  afterAll(async () => {
    await database.closePool();
  });

  it("should update an existing post", async () => {
    const getAllPostsResponse = await request(app).get("/posts/admin");
    
    expect(getAllPostsResponse.status).toBe(200);
    expect(getAllPostsResponse.body).toHaveProperty("success", true);
    expect(getAllPostsResponse.body).toHaveProperty("data");
    expect(getAllPostsResponse.body.data).toBeInstanceOf(Array);

    const postId = getAllPostsResponse.body.data[0]?.id;
    if (!postId) {
      throw new Error("Não tem nenhum post no banco de dados");
    }

    const updatedPostData = {
      title: "Fundamentos da História",
      description: "Um resumo dos principais eventos históricos.",
      content: "Aqui, discutiremos os eventos mais significativos na história mundial, desde as civilizações antigas até os eventos modernos. A história nos ajuda a entender o presente e a planejar o futuro.",
      author: "Maria Oliveira",
      subject: "História",
    };

    const updateResponse = await request(app).put(`/posts/admin/update/${postId}`).send(updatedPostData);

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toHaveProperty("success", true);
    expect(updateResponse.body).toHaveProperty("message", "Post atualizado com sucesso");

    const getUpdatedPostResponse = await request(app).get(`/posts/${postId}`);

    expect(getUpdatedPostResponse.status).toBe(200);
    expect(getUpdatedPostResponse.body).toHaveProperty("success", true);
    expect(getUpdatedPostResponse.body).toHaveProperty("data");

    const updatedPost = getUpdatedPostResponse.body.data;

    expect(updatedPost).toMatchObject(updatedPostData);
  });
});
