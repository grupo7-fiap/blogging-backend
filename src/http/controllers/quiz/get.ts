import { Request, Response } from 'express';
import { database } from '../../../lib/mysql/db';
import { RowDataPacket } from 'mysql2';
import { z } from 'zod';

export const getQuizByPost = async (req: Request, res: Response) => {
    let connection;
  
    try {
  
      const postIdSchema = z.string().regex(/^\d+$/, 'O ID do post deve ser um número válido.');
      const postId = postIdSchema.parse(req.params.id || '');
  
      connection = await database.poolInstance.getConnection();
  
      const [rows] = await connection.query<RowDataPacket[]>(
        'SELECT questions FROM quiz WHERE post_id = ?',
        [postId]
      );
  
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Nenhum quiz encontrado para este post.' });
      }
  
      const formattedQuestions = rows[0].questions.replace(/\n/g, ' ').trim();
      res.json({ questions: formattedQuestions });

    } catch (error) {
      const err = error as Error;
      console.error('Erro ao buscar quiz:', err.message);
      res.status(500).json({ error: err.message });
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
