import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../../app';
import { Order, OrderStatus } from '../../../models/order';
import { Ticket } from '../../../models/ticket';

describe('newOrderRouter', () => {
  it('returns an error if the ticket does not exist', async () => {
    const ticketId = mongoose.Types.ObjectId();

    await request(app)
      .post('/api/orders')
      .set('Cookie', await global.signin())
      .send({ ticketId })
      .expect(400);
  });

  it('return an error if the ticket is already reserved', async () => {
    const ticket = Ticket.build({
      title: 'concert',
      price: 20,
    });
    await ticket.save();

    const order = Order.build({
      ticket,
      userId: 'kysdgacjksygd',
      status: OrderStatus.Created,
      expiresAt: new Date(),
    });
    await order.save();

    await request(app)
      .post('/api/orders')
      .set('Cookie', await global.signin())
      .send({
        ticketId: ticket.id,
      })
      .expect(400);
  });

  it('reserves a ticket', async () => {
    const ticket = Ticket.build({
      title: 'concert',
      price: 20,
    });
    await ticket.save();

    await request(app)
      .post('/api/orders')
      .set('Cookie', await global.signin())
      .send({ ticketId: ticket.id })
      .expect(201);
  });
});
