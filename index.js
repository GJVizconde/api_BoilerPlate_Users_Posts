import app from './src/app.js';
import { sequelize as conn } from './src/db.js';
const { PORT, NODE_ENV: env } = process.env;

const port = PORT || 3001;

conn
  .sync({ alter: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`%s listening at %s , %s mode on`, 'Server', port, env);
    });
  })
  .catch((error) => {
    console.error('Error init:', error);
  });
