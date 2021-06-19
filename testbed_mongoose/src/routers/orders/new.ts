import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { validateRequest } from '../../middlewares/validate-request';

import { Ticket } from '../../models/ticket';

const router = express.Router();

router.post(
  '/api/orders',
  [body('ticketId').not().isEmpty().isMongoId().withMessage('TicketId must be provided')],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    // find the ticket the user is trying to order in the database
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new Error('Not Found');
    }

    // make sure that this ticket is not already reserved
    const isReserved = ticket.isReserved();
    if (isReserved) {
      throw new Error('Ticket is already reservde');
    }

    res.send({});
  }
);

export { router as newOrderRouter };
