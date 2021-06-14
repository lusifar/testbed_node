import { TicketCreatedListener } from './events/ticket-created-listener';
import { natsWrapper } from './nats-wrapper';

export const invoke = () => {
  console.log('Invoke test-listener');
  const listener = new TicketCreatedListener(natsWrapper.client).listen();
};
