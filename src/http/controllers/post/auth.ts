import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { RowDataPacket } from 'mysql2';
import { database } from '../../../lib/mysql/db';
import { User } from '../../../entities/user.entity';

dotenv.config();
const secret = process.env.JWT_SECRET as string;

export const registerUser = async (req: Request, res: Response) => {
  console.log('registerUser');
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  await database.poolInstance.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hashedPassword],
  );

  res.status(201).json({ message: 'User registered successfully' });
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const [rows] = await database.poolInstance.query<RowDataPacket[]>(
    'SELECT * FROM users WHERE username = ?',
    [username],
  );

  const user = rows[0] as User;

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user.id, username: user.username }, secret, {
      expiresIn: '1h',
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
