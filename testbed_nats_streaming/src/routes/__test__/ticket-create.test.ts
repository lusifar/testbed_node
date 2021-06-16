import request from 'supertest';
import { app } from '../../app';

import { natsWrapper } from '../../nats-wrapper';

it('return 201 on successful setup', async () => {
  await request(app)
    .post('/ticket')
    .send({
      title: 'test title',
      price: 200,
      userId: '1234567',
    })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
