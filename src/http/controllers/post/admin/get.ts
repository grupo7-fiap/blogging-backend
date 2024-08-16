import { Request, Response } from 'express';
import { database } from '../../../../lib/mysql/db';
import { z } from 'zod';
import { Post } from '../../../../interfaces/PostInterface';

const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  content: z.string(),
  author: z.string(),
  subject: z.string(),
  //modifiedDate: z.date(),
  createdDate: z.date(),
});

export const getAdminPosts = async (req: Request, res: Response) => {
  let connection;
  try {
    connection = await database.poolInstance.getConnection();
    const [rows] = await connection.query<Post[]>('SELECT * FROM posts');

    const formattedRows = rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      content: row.content,
      author: row.author,
      subject: row.subject,
      modifiedDate: row.modifiedDate,
      createdDate: row.createdDate,
    }));

    const validPosts = formattedRows.filter((post) => {
      try {
        PostSchema.parse(post);
        return true;
      } catch (error) {
        console.error('Error validating post:', error);
        return false;
      }
    });

    res.json({
      success: true,
      data: validPosts,
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Failed to fetch posts' });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
