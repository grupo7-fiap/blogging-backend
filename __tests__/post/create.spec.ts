import request from 'supertest';
import { app } from '../../src/app'; 
import { database } from '../../src/lib/mysql/db'; 

describe('GET /posts', () => {
  it('should return a list of posts', async () => {
    const response = await request(app).get('/posts');
    console.log('GET /posts response:', response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);
    response.body.data.forEach((post: any) => {
      expect(post).toHaveProperty('id');
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('description');
      expect(post).toHaveProperty('content');
      expect(post).toHaveProperty('author');
      expect(post).toHaveProperty('subject');
      expect(post).toHaveProperty('modifiedDate');
      expect(post).toHaveProperty('createdDate');
    });
  });
});

describe('GET /posts/:id', () => {
  it('should return a single post', async () => {
    const postId = 1; // ID existe no banco de dados de teste
    const response = await request(app).get(`/posts/${postId}`);
    console.log(`GET /posts/${postId} response:`, response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('id', postId);
    expect(response.body.data).toHaveProperty('title');
    expect(response.body.data).toHaveProperty('description');
    expect(response.body.data).toHaveProperty('content');
    expect(response.body.data).toHaveProperty('author');
    expect(response.body.data).toHaveProperty('subject');
    expect(response.body.data).toHaveProperty('modifiedDate');
    expect(response.body.data).toHaveProperty('createdDate');
  });

  it('should return 404 if the post is not found', async () => {
    const nonExistentPostId = 99999; // Um ID que não existe
    const response = await request(app).get(`/posts/${nonExistentPostId}`);
    console.log(`GET /posts/${nonExistentPostId} response:`, response.body);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('error', 'Post not found');
  });
});

afterAll(async () => {
  await database.closePool(); // Fechando o pool de conexões com o banco de dados após todos os testes
});
