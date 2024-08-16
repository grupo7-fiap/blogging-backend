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

export const searchAdminPosts = async (req: Request, res: Response) => {
    const { title, author, subject } = req.query;
  
    let connection;
    try {
      connection = await database.poolInstance.getConnection();
      let query = 'SELECT * FROM posts WHERE 1=1';
  
      if (title) {
        query += ' AND title LIKE ?';
      }
  
      if (author) {
        query += ' AND author LIKE ?';
      }
  
      if (subject) {
        query += ' AND subject LIKE ?';
      }
  
      const params = [title, author, subject].filter(Boolean).map((value) => `%${value}%`);
  
      const [rows] = await connection.query<Post[]>(query, params);
  
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
      console.error('Error searching posts:', error);
      res.status(500).json({ message: 'Failed to search posts' });
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };