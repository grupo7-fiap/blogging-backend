import { Router } from 'express';
import { getPosts, getPostById, createPost } from './create';
import { getAdminPosts } from './admin/get';

const router = Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.get('/admin', getAdminPosts);

export default router;
