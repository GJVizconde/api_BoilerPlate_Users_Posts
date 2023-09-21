import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  partialUpdateUser,
  updateUser,
} from './user.controller.js';

const userRouter = Router();

userRouter.post('/', createUser);

userRouter.get('/', getUsers);

userRouter.get('/:id', getUserById);

userRouter.put('/:id', updateUser);

userRouter.patch('/:id', partialUpdateUser);

userRouter.delete('/:id', deleteUser);

export default userRouter;
