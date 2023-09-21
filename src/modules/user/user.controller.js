import { controllerHandlerError } from '../../utils/handlerError.js';
import {
  createNewUser,
  getAllUsers,
  getUserByName,
  searchUserById,
  updateDataUser,
  userDeleted,
  userUpdated,
} from './user.service.js';

// GET USERS

export const getUsers = async (req, res) => {
  const { name } = req.query;

  try {
    const results = name ? await getUserByName(name) : await getAllUsers();
    res.status(200).json(results);
  } catch (error) {
    controllerHandlerError(res, error);
  }
};

// CREATE USERS

export const createUser = async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const newUser = await createNewUser(name, email, phone);

    res.status(200).json(newUser);
  } catch (error) {
    controllerHandlerError(res, error);
  }
};

// UPDATE USER

export const updateUser = async (req, res) => {
  const { name, email, phone } = req.body;
  const { id } = req.params;

  try {
    const user = await updateDataUser(id, name, email, phone);

    res.status(200).json(user);
  } catch (error) {
    controllerHandlerError(res, error);
  }
};

// GET USER BY ID

export const getUserById = async (req, res) => {
  const { id } = req.params;

  const source = isNaN(id) ? 'bdd' : 'api';

  try {
    const user = await searchUserById(id, source);
    res.status(200).json(user);
  } catch (error) {
    controllerHandlerError(res, error);
  }
};

// PARTIAL UPDATE USER

export const partialUpdateUser = async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  const source = isNaN(id) ? 'bdd' : 'api';

  try {
    const user = await userUpdated(id, updateFields, source);
    res.status(200).json(user);
  } catch (error) {
    controllerHandlerError(res, error);
  }
};

// DELETE USER

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const source = isNaN(id) ? 'bdd' : 'api';

  try {
    const response = await userDeleted(id, source);
    res.status(200).json(response);
  } catch (error) {
    controllerHandlerError(res, error);
  }
};
