import { User } from '../db.js';
import { controllerHandlerError } from '../utils/handlerError.js';

export const validateCreateUser = async (req, res, next) => {
  const { name, email, phone } = req.body;

  try {
    if (!name) throw new Error('Missing name');
    if (!email) throw new Error('Missing email');
    if (!phone) throw new Error('Missing phone');

    const user = await User.findAll({ where: { email } });

    if (user) throw new Error('Email is already registered');

    next();
  } catch (error) {
    controllerHandlerError(res, error);
  }
};
