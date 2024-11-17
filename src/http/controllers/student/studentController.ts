import { Request, Response } from 'express';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { database } from '../../../lib/mysql/db';
import { Student } from '../../../entities/student.entity';

export const createStudent = async (req: Request, res: Response) => {
  const { username, email, cpf } = req.body;

  await database.poolInstance.query(
    'INSERT INTO students (username, email, cpf) VALUES (?, ?, ?)',
    [username, email, cpf],
  );

  res.status(201).json({ message: 'Student created successfully' });
};

export const getStudents = async (req: Request, res: Response) => {
  const [rows] = await database.poolInstance.query<RowDataPacket[]>(
    'SELECT * FROM students',
  );

  const students = rows as Student[];
  res.status(200).json(students);
};

export const getStudentById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const [rows] = await database.poolInstance.query<RowDataPacket[]>(
    'SELECT * FROM students WHERE id = ?',
    [id],
  );

  const student = rows[0] as Student;
  if (student) {
    res.status(200).json(student);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email, cpf } = req.body;

  const [result] = await database.poolInstance.query<ResultSetHeader>(
    'UPDATE students SET username = ?, email = ?, cpf = ?, updated_at = ? WHERE id = ?',
    [username, email, cpf, new Date(), id],
  );

  if (result.affectedRows > 0) {
    res.status(200).json({ message: 'Student updated successfully' });
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  const { id } = req.params;

  const [result] = await database.poolInstance.query<ResultSetHeader>(
    'DELETE FROM students WHERE id = ?',
    [id],
  );

  if (result.affectedRows > 0) {
    res.status(200).json({ message: 'Student deleted successfully' });
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
};
