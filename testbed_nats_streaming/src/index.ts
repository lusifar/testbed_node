import dotenv from 'dotenv';
dotenv.config();

import { v4 as uuidv4 } from 'uuid';

import { app } from './app';
import { natsWrapper } from './nats-wrapper';

import { invoke as invokeTestListener } from './test-listener';

const run = async () => {
  if (!process.env.NATS_CLUSTER_ID || !process.env.NATS_URL) {
    throw new Error('NATS clusterId or url is not existed');
  }

  try {
    await natsWrapper.connect(process.env.NATS_CLUSTER_ID, uuidv4(), process.env.NATS_URL);

    // centralize the close event of nats connection
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    // invoke the test-listener
    invokeTestListener();
  } catch (err) {
    console.error(err);
  }

  app.listen(3001, () => {
    console.log('Listening on port 3001');
  });
};

run();
