import request from 'supertest';
import { app } from '../../../src/app';
import { database } from '../../../src/lib/mysql/db';
import { Post } from '../../../src/interfaces/PostInterface';

describe('GET /posts/admin', () => {
  afterAll(async () => {
    await database.closePool();
  });
  it('should return a list of posts', async () => {
    const response = await request(app).get('/posts/admin');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);

    response.body.data.forEach((post: Post) => {
      expect(post).toHaveProperty('id');
      expect(typeof post.id).toBe('number');

      expect(post).toHaveProperty('title');
      expect(typeof post.title).toBe('string');

      expect(post).toHaveProperty('description');
      expect(typeof post.description).toBe('string');

      expect(post).toHaveProperty('content');
      expect(typeof post.content).toBe('string');

      expect(post).toHaveProperty('author');
      expect(typeof post.author).toBe('string');

      expect(post).toHaveProperty('subject');
      expect(typeof post.subject).toBe('string');

      expect(post).toHaveProperty('modifiedDate');
      expect(new Date(post.modifiedDate)).toBeInstanceOf(Date);

      expect(post).toHaveProperty('createdDate');
      expect(new Date(post.createdDate)).toBeInstanceOf(Date);
    });
  });
});
