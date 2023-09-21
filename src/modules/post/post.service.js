import { Post } from '../../db.js';
import { serviceError } from '../../utils/errorResponse.js';

export const createNewPost = async (title, body) => {
  try {
    await Post.create(title, body);
  } catch (error) {
    serviceError(error, 'An error ocurred while creating a new post');
  }
};
