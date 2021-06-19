import * as dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler } from './middlewares/error-handler';

import { signupRouter } from './routers/users/signup';
import { newOrderRouter } from './routers/orders/new';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(signupRouter);
app.use(newOrderRouter);
app.use(errorHandler);

app.all('*', async (req: Request, res: Response) => {
  throw new Error('Not Found');
});

export { app };
