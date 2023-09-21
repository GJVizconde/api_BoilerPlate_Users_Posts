import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import router from './routes/router.js';
import cors from 'cors';
import configCors from './config/cors.config.js';

const app = express();

app.use(morgan('dev'));

app.use(cors(configCors));

app.use(express.json());

app.use('/api', router);

export default app;
