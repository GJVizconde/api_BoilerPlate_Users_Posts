import { handleErrorResponse } from '../../utils/errorResponse.js';
import { createNewPost } from './post.service.js';

export const createPost = async (req, res) => {
  const { title, body } = req.body;

  try {
    const newPost = await createNewPost(title, body);
    res.status(200).json(newPost);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
