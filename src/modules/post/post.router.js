import { Router } from 'express';
import {
  createPost,
  deletePost,
  getPosts,
  partialUpdatePost,
  updatePost,
} from './post.controller.js';

const postRouter = Router();

postRouter.post('/', createPost);
postRouter.get('/', getPosts);
postRouter.put('/:id', updatePost);
postRouter.patch('/:id', partialUpdatePost);
postRouter.delete('/:id', deletePost);

export default postRouter;
