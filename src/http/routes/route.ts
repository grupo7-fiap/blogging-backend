import { Router } from 'express';
import { getPosts, getPostById, createPost } from '../controllers/post/create';
import { getAdminPosts } from '../controllers/post/admin/get';
import { searchAdminPosts } from '../controllers/post/admin/search';
import { updatePost } from '../controllers/post/admin/put';
import { deleteAdminPost } from '../controllers/post/admin/delete';
import { authenticateToken } from '../../middleware/auth';
import { getQuizByPost } from '../controllers/quiz/get';

const router = Router();

router.get('/', getPosts);
router.get('/admin', authenticateToken, getAdminPosts);
router.put('/admin/update/:id', authenticateToken, updatePost);
router.get('/admin/search', authenticateToken, searchAdminPosts);
router.delete('/admin/delete/:id', authenticateToken, deleteAdminPost);
router.get('/quiz/:id', getQuizByPost);
router.get('/:id', getPostById);
router.post('/', authenticateToken, createPost);

export default router;
