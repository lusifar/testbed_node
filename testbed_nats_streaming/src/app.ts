import express from 'express';
import { json } from 'body-parser';

import { ticketCreateRouter } from './routes/ticket-create';
const app = express();

app.use(json());

app.use(ticketCreateRouter);

export { app };
