import { Router } from 'express';
import { getPosts, getPostById } from './create';
import { getAdminPosts } from './admin/get';

const router = Router();

router.get('/', getPosts);
router.get('/admin', getAdminPosts);
router.get('/:id', getPostById);

export default router;
