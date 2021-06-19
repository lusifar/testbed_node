import express, { Request, Response } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { errorHandler } from './middlewares/error-handler';

import { signupRouter } from './routers/users/signup';

const app = express();
app.set('trust proxy', true);

app.use(json());
app.use(signupRouter);
app.use(errorHandler);

app.all('*', async (req: Request, res: Response) => {
  throw new Error('Not Found');
});

export { app };
