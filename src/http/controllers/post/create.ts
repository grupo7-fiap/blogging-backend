import { Request, Response } from 'express';
import { database } from '../../../lib/mysql/db';
import { Post } from '../../../interfaces/PostInterface';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const connection = await database.getConnection();
    const [rows] = await connection.query<Post[]>('SELECT * FROM posts');
    connection.release();

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

    res.json({
      success: true,
      data: formattedRows,
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch posts' });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  const postId = req.params.id;

  try {
    const connection = await database.getConnection();
    const [rows] = await connection.query<Post[]>(
      'SELECT * FROM posts WHERE id = ?',
      [postId],
    );
    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }

    const post: Post = rows[0];
    const formattedPost = {
      id: post.id,
      title: post.title,
      description: post.description,
      content: post.content,
      author: post.author,
      subject: post.subject,
      modifiedDate: post.modifiedDate,
      createdDate: post.createdDate,
    };

    res.json({
      success: true,
      data: formattedPost,
    });
  } catch (error) {
    console.error('Error fetching post by id:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch post' });
  }
};
