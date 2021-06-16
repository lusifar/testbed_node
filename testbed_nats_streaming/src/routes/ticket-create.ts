import express, { Response, Request } from 'express';

import { natsWrapper } from '../nats-wrapper';
import { TicketCreatedPublisher } from '../events/ticket-created-publisher';

const router = express.Router();

router.post('/ticket', async (req: Request, res: Response) => {
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

export { router as ticketCreateRouter };
