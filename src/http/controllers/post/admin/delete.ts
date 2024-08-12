import { Request, Response } from 'express';
import { database } from '../../../../lib/mysql/db';

export const deleteAdminPost = async (req: Request, res: Response) => {
    const postId = req.params.id;
  
    let connection;
    try {
      connection = await database.getConnection();
      await connection.query('DELETE FROM posts WHERE id = ?', 
        [postId],
      );
  
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ message: 'Failed to delete post' });
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }