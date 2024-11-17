import { Router } from 'express';
import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from '../controllers/student/studentController';
import { authenticateToken } from '../../middleware/auth';

const studentRouter = Router();

studentRouter.post('/', authenticateToken, createStudent);
studentRouter.get('/', authenticateToken, getStudents);
studentRouter.get('/:id', authenticateToken, getStudentById);
studentRouter.put('/:id', authenticateToken, updateStudent);
studentRouter.delete('/:id', authenticateToken, deleteStudent);

export default studentRouter;
