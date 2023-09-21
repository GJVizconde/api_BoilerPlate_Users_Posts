import { Router } from 'express';
import { createPost } from './post.controller.js';

const postRouter = Router();

postRouter.get('/', createPost);

export default postRouter;
