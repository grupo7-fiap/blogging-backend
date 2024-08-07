import { Router } from 'express';
import { getPosts, getPostById, createPost } from './create';
import { getAdminPosts } from './admin/get';
import { updatePost } from './admin/put';

const router = Router();

router.get('/', getPosts);
router.get('/admin', getAdminPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.put('/:id', updatePost);

export default router;
