import { Message } from 'node-nats-streaming';
import { Listener } from './events/base-listener';
import { TicketCreatedEvent } from './events/ticket-created-event';
import { Subjects } from './events/subjects';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName: string = 'payments-service';
  onMessage(data: { id: string; title: string; price: number; userId: string }, msg: Message): void {
    console.log('Event data!', data);

    msg.ack();
  }
}
