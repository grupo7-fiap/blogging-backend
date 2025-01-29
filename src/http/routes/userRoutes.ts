import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/user/userController';
import { authenticateToken } from '../../middleware/auth';

const userRouter = Router();

userRouter.post('/', authenticateToken, createUser);
userRouter.get('/', authenticateToken, getUsers);
userRouter.get('/:id', authenticateToken, getUserById);
userRouter.put('/:id', authenticateToken, updateUser);
userRouter.delete('/:id', authenticateToken, deleteUser);

export default userRouter;
