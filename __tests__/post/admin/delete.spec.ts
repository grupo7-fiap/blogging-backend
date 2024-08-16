import request from 'supertest';
import { app } from '../../../src/app';
import { database } from '../../../src/lib/mysql/db';

describe.only('DELETE /posts/admin/delete/:id', () => {
    afterAll(async () => {
      await database.closePool();
    });
  
    it('should delete a post', async () => {
      const response = await request(app).get('/posts/admin');
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toBeInstanceOf(Array);
  
      const postId = response.body.data[0].id;
  
      const deleteResponse = await request(app).delete(`/posts/admin/delete/${postId}`);
  
      expect(deleteResponse.status).toBe(200);
      expect(deleteResponse.body).toHaveProperty('success', true);
    });
  });
  