import { Router } from 'express';
import { getPosts, getPostById, createPost } from './create';
import { getAdminPosts } from './admin/get';
import { updatePost } from './admin/put';

const router = Router();

router.get('/', getPosts);
router.get('/admin', getAdminPosts);
router.put('/admin/update/:id', updatePost);
router.get('/:id', getPostById);
router.post('/', createPost);

export default router;
