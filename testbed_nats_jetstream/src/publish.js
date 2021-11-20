const NATSClient = require('./utilities/natsClient');

const run = async () => {
  const natsClient = NATSClient.instance();
  await natsClient.connect('demo.nats.io', 4222);

  const stream = 'AIC_DEFECTBOT';
  const subject = 'DAILY_MAINTAIN';

  const total = 100;
  let count = 0;
  const handle = setInterval(async () => {
    if (count >= total) {
      clearInterval(handle);

      await natsClient.disconnect();
      return;
    }

    console.log('publish the count: ', count);
    natsClient.publish(stream, subject, {
      count,
    });

    count += 1;
  }, 1000);
};

run();
