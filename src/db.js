import { Sequelize } from 'sequelize';

import UserModel from './modules/user/user.model.js';
import PostModel from './modules/post/post.model.js';

const { DB_USER, DB_HOST, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/boiler`,
  { logging: false }
);

UserModel(sequelize);
PostModel(sequelize);

const { User, Post } = sequelize.models;

export { sequelize, User, Post };
