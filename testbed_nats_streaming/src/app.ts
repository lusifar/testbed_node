import express, { Request, Response } from 'express';
import { json } from 'body-parser';

import { natsWrapper } from './nats-wrapper';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

const app = express();

app.use(json());

app.post('/ticket', async (req: Request, res: Response) => {
  try {
    const ticket = req.body;

    const publisher = new TicketCreatedPublisher(natsWrapper.client);
    await publisher.publish({
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
    });

    res.status(201).send(ticket);
  } catch (err) {
    console.error(err);
  }
});

export { app };
