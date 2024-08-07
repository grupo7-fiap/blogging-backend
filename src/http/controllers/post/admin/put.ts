import { Request, Response } from 'express';
import { database } from '../../../../lib/mysql/db';
import { ResultSetHeader } from 'mysql2';
import { z } from 'zod';

const PostUpdateSchema = z.object({
  title: z.string(),
  description: z.string(),
  content: z.string(),
  author: z.string(),
  subject: z.string(),
});

export const updatePost = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const { title, description, content, author, subject } = req.body;

  try {
    // Validate input
    PostUpdateSchema.parse({ title, description, content, author, subject });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: 'Invalid input data.',
    });
  }

  let connection;
  try {
    connection = await database.poolInstance.getConnection();

    const [result] = await connection.query<ResultSetHeader>(
      'UPDATE posts SET title = ?, description = ?, content = ?, author = ?, subject = ?, modifiedDate = ? WHERE id = ?',
      [title, description, content, author, subject, new Date(), postId],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }

    res.json({ success: true, message: 'Post updated successfully' });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ success: false, error: 'Failed to update post' });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
