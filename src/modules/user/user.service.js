import { User } from '../../db.js';
import axios from 'axios';
import cleanArray from '../../utils/cleanArray.js';
import { Op } from 'sequelize';
import { serviceError } from '../../utils/errorResponse.js';
import isUUIDv4 from '../../utils/uuidValidate.js';

// GET ALL USERS
export const getAllUsers = async () => {
  try {
    const usersBd = await User.findAll();

    const apiUsersRaw = (
      await axios.get('https://jsonplaceholder.typicode.com/users')
    ).data;

    const apiUsers = cleanArray(apiUsersRaw);

    return [...usersBd, ...apiUsers];
  } catch (error) {
    serviceError(error, 'An error occurred while retrieving all users.');
  }
};

// GET USER BY NAME
export const getUserByName = async (name) => {
  try {
    const usersByName = await User.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
    });

    const apiUsersRaw = (
      await axios.get('https://jsonplaceholder.typicode.com/users/')
    ).data;

    const apiUsers = cleanArray(apiUsersRaw);

    const filteredApi = apiUsers.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );

    return [...usersByName, ...filteredApi];
  } catch (error) {
    serviceError(error, 'Ocurred an error');
  }
};

//CREATE NEW USER
export const createNewUser = async (name, email, phone) => {
  try {
    return await User.create({ name, email, phone });
  } catch (error) {
    serviceError(error, 'Ocurred an error');
  }
};

// UPDATE DATA USER

export const updateDataUser = async (id, name, email, phone) => {
  try {
    if (!isNaN(id)) {
      console.log('Hola');
      throw new Error('Not valid User Id');
    }

    const userToUpdate = await User.findByPk(id);

    if (!userToUpdate) {
      throw new Error('User not found');
    }

    userToUpdate.name = name;
    userToUpdate.email = email;
    userToUpdate.phone = phone;

    const user = await userToUpdate.save();

    return {
      user,
      message: 'Data user was successfully updated',
    };
  } catch (error) {
    serviceError(error, 'There was an error updating the user data.');
  }
};

// GET USER BY ID

export const searchUserById = async (id, source) => {
  try {
    if (source === 'api') {
      if (id > 10) {
        throw new Error('User not found');
      }

      const userRaw = (
        await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      ).data;

      const user = cleanArray([userRaw]);

      return user;
    }

    if (!isUUIDv4(id)) {
      throw new Error('User not found');
    }

    const user = await User.findByPk(id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    serviceError(error, 'An error ocurred while searching user by id');
  }
};

// USER PARTIAL UPDATED

export const userUpdated = async (id, updateFields, source) => {
  try {
    if (source === 'api') {
      throw new Error('Invalid user id format');
    }

    if (!isUUIDv4(id)) {
      throw new Error('Invalid user id format');
    }

    console.log(updateFields);

    const user = await User.findByPk(id);

    if (!user) throw new Error('User not found');

    const rowsUpdated = await User.update(updateFields, {
      where: { id: user.id },
    });

    console.log(rowsUpdated);

    if (rowsUpdated === 0) {
      throw new Error('User not updated');
    }

    const updatedUser = await User.findByPk(user.id);

    return updatedUser;
  } catch (error) {
    serviceError(error, 'An error occurred while updating user data');
  }
};

export const userDeleted = async (id, source) => {
  try {
    if (source === 'api') throw new Error('Invalid user id format');

    if (!isUUIDv4(id)) throw new Error('Invalid user id format');

    const user = await User.findByPk(id);

    if (!user) throw new Error('User not found');

    const deletedUser = await User.destroy({
      where: {
        id,
      },
      force: true, // Desactiva la eliminación lógica
    });

    return {
      user,
      message: 'User successfully deleted.',
    };
  } catch (error) {
    serviceError(error, 'An error occurred while deleting the user');
  }
};
