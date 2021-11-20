const NATSClient = require('./utilities/natsClient');

const run = async () => {
  const natsClient = NATSClient.instance();
  await natsClient.connect('demo.nats.io', 4222);

  const stream = 'AIC_DEFECTBOT';
  const subject = 'DAILY_MAINTAIN';

  natsClient.subscribe(stream, subject, (obj) => {
    console.log(obj);
  });
};

run();
