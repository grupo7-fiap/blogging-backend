import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { database } from '../../../lib/mysql/db';
import { User } from '../../../entities/user.entity';

export const createUser = async (req: Request, res: Response) => {
  const { username, password, createdAt } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  await database.poolInstance.query(
    'INSERT INTO users (username, password, createdAt) VALUES (?, ?, ?)',
    [username, hashedPassword, createdAt],
  );

  res.status(201).json({ message: 'User created successfully' });
};

export const getUsers = async (req: Request, res: Response) => {
  const [rows] = await database.poolInstance.query<RowDataPacket[]>(
    'SELECT * FROM users',
  );

  const users = rows as User[];
  res.status(200).json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const [rows] = await database.poolInstance.query<RowDataPacket[]>(
    'SELECT * FROM users WHERE id = ?',
    [id],
  );

  const user = rows[0] as User;
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await database.poolInstance.query<ResultSetHeader>(
    'UPDATE users SET username = ?, password = ?, updated_at = ? WHERE id = ?',
    [username, hashedPassword, new Date(), id],
  );

  if (result.affectedRows > 0) {
    res.status(200).json({ message: 'User updated successfully' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const [result] = await database.poolInstance.query<ResultSetHeader>(
    'DELETE FROM users WHERE id = ?',
    [id],
  );

  if (result.affectedRows > 0) {
    res.status(200).json({ message: 'User deleted successfully' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
