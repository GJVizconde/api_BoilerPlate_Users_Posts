import { Router } from 'express';
import userRouter from '../modules/user/user.router.js';
import postRouter from '../modules/post/post.router.js';

const router = Router();

router.use('/user', userRouter);

router.use('/post', postRouter);

export default router;
