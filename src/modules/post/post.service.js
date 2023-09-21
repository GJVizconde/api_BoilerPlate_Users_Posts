import { Post } from '../../db.js';
import { serviceHandlerError } from '../../utils/handlerError.js';

export const createNewPost = async (title, body) => {
  try {
    await Post.create(title, body);
  } catch (error) {
    serviceHandlerError(error, 'An error ocurred while creating a new post');
  }
};
