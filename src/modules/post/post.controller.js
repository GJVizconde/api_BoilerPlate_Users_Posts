import { controllerHandlerError } from '../../utils/handlerError.js';
import {
  createNewPost,
  getAllPosts,
  postPartialUpdated,
  postToDelete,
  searchPostByContent,
  searchPostById,
  updatePostData,
} from './post.service.js';

export const createPost = async (req, res) => {
  const { title, body, userId } = req.body;

  try {
    const newPost = await createNewPost(title, body, userId);
    res.status(201).json(newPost);
  } catch (error) {
    controllerHandlerError(res, error);
  }
};

// GET POSTS

export const getPosts = async (req, res) => {
  const { searchInput } = req.query;

  try {
    const response = searchInput
      ? await searchPostByContent(searchInput)
      : await getAllPosts();

    res.status(200).json(response);
  } catch (error) {
    controllerHandlerError(res, error);
  }
};

// GET POST BY ID

export const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await searchPostById(id);

    res.status(200).json(post);
  } catch (error) {
    controllerHandlerError(res, error);
  }
};

//UPDATE POST

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  console.log(title, body, id);

  try {
    const post = await updatePostData(id, title, body);

    res.status(200).json(post);
  } catch (error) {
    controllerHandlerError(res, error);
  }
};

//UPDATE PARTIAL POST

export const partialUpdatePost = async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  try {
    const post = await postPartialUpdated(id, updateFields);
    res.status(200).json(post);
  } catch (error) {
    controllerHandlerError(res, error);
  }
};

// DELETE POST

export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postToDelete(id);

    res.status(200).json(post);
  } catch (error) {
    controllerHandlerError(res, error);
  }
};
