import { Post } from '../../db.js';
import { serviceHandlerError } from '../../utils/handlerError.js';

// CREATE NEW POST

export const createNewPost = async (title, body, userId) => {
  try {
    const newPost = await Post.create({ title, body });
    await newPost.setUser(userId);
    return newPost;
  } catch (error) {
    serviceHandlerError(error, 'An error ocurred while creating a new post');
  }
};

//  GET ALL POSTS

export const getAllPosts = async () => {
  try {
    return await Post.findAll();
  } catch (error) {
    serviceHandlerError(error, 'An error ocurred while retrieving all posts');
  }
};

//GET POST BY CONTENT

export const searchPostByContent = async (searchInput) => {
  try {
    if (searchInput.length <= 3) {
      throw new Error('Try another word');
    }
    console.log(searchInput);

    const posts = await Post.findAll();

    const searchInputArray = searchInput.toLowerCase().split(' ');

    const matchContentBody = posts.filter((elem) =>
      searchInputArray.some((word) => elem.body.toLowerCase().includes(word))
    );

    const matchContentTitle = posts.filter((elem) =>
      searchInputArray.some((word) => elem.title.toLowerCase().includes(word))
    );

    return [...matchContentTitle, ...matchContentBody];
  } catch (error) {
    serviceHandlerError(error, 'An error ocurred while searching process');
  }
};

// GET POST BY ID

export const searchPostById = async (id) => {
  try {
    const post = await Post.findByPk(id);

    if (!post) throw new Error('Post not found');

    return post;
  } catch (error) {
    serviceHandlerError(error, 'An error ocurred during post searching by id');
  }
};

// UPDATE POST DATA

export const updatePostData = async (id, title, body) => {
  try {
    const post = await Post.findByPk(id);

    if (!post) throw new Error('User not found');

    post.title = title;
    post.body = body;

    await post.save();

    return {
      post,
      message: 'Post susccefully updated',
    };
  } catch (error) {
    serviceHandlerError(error, 'An error ocurred during updating data user');
  }
};

// UPDATE PARTIAL POST

export const postPartialUpdated = async (id, updateFields) => {
  try {
    const getPost = await Post.findByPk(id);

    if (!getPost) throw new Error('Post not found');

    const rowsUpdated = await Post.update(updateFields, {
      where: { id: getPost.id },
    });

    const updatedPost = await Post.findByPk(id);

    return {
      updatedPost,
      message: 'Post successfully updated',
    };
  } catch (error) {
    serviceHandlerError(error, 'An error ocurred during updating data user');
  }
};

// DELETE POST

export const postToDelete = async (id) => {
  try {
    const post = await Post.findByPk(id);

    if (!post) throw new Error('User not found');

    const deletedPost = await Post.destroy({
      where: {
        id,
      },
    });

    return {
      post,
      message: 'Post succesfully deleted',
    };
  } catch (error) {
    serviceHandlerError(error, 'An error ocurred during deleting post');
  }
};
