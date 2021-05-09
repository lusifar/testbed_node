import express from 'express';
import { json } from 'body-parser';

import { authRouter } from './routers/auth';

const app = express();

app.use(json());

app.use('/', authRouter);

app.listen(3000, () => {
  console.log('express is alive!');
});
