import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { errorHandler } from './middlewares';
import router from './routes';

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.NODE_PORT || 3000);
app.set('env', process.env.NODE_ENV || 'dev');

const corsOptions = {
  origin: [process.env.ORIGIN, 'http://localhost:3000', 'http://192.168.1.122:3000'],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.use(errorHandler);

export default app;
