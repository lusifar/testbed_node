import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedPublisher } from './ticket-created-publisher';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', async () => {
  console.log('Publisher connect to NATS');

  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: '123',
      title: 'concert',
      price: 20,
      userId: 'rickychao',
    });
  } catch (err) {
    console.error(err);
    stan.close();
  }
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
