import { database } from '../../../lib/mysql/db';
import { ResultSetHeader } from 'mysql2';
import chatWithOpenAI from '../../../index';

interface QuizCreate {
  id: number;
  post_id: number;
  questions: string;
}

export const createQuiz = async (postId: number, content: string): Promise<QuizCreate | null> => {
  try {
    // Chama a API OpenAI para gerar as perguntas
    const questions = await chatWithOpenAI(content);

    if (!questions) {
      throw new Error('Falha ao gerar as questões pela OpenAI.');
    }

    const connection = await database.getConnection();

    // Insere os dados na tabela `quiz`
    const [result] = await connection.query<ResultSetHeader>(
      'INSERT INTO quiz (post_id, questions) VALUES (?, ?)',
      [postId, questions],
    );

    connection.release();

    return {
      id: result.insertId,
      post_id: postId,
      questions,
    };
  } catch (error) {
    console.error('Error creating quiz:', error);
    return null;
  }
};
