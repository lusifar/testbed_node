const { FlowProducer } = require('bullmq');

const repeatQueue = require('./queues/repeat');
const pollingQueue = require('./queues/polling');
const commonQueue = require('./queues/common');
const schedulerQueue = require('./queues/scheduler');

const repeatWorker = require('./workers/repeat');
const pollingWorker = require('./workers/polling');
const commonWorker = require('./workers/common');

const { APP } = require('./constants');

const app = require('./app');

const run = async () => {
  app.listen(APP.PORT, async () => {
    console.log(`the app is running on port: ${APP.PORT}`);

    global.flowProducer = new FlowProducer();

    // const flow = await flowProducer.add({
    //   name: 'dmon_pa',
    //   queueName: QUEUE.COMMON,
    //   data: {
    //     endpoint: 'http://127.0.0.1:3030/api/v1/job/process',
    //     payload: {
    //       test: 'test',
    //     },
    //   },
    //   prefix: `{${QUEUE.COMMON}}`,
    //   opts: 'repeat',
    //   children: [
    //     {
    //       name: 'dmon_pa',
    //       queueName: QUEUE.POLLING,
    //       data: {
    //         endpoint: 'http://127.0.0.1:3030/api/v1/job/process',
    //         payload: {
    //           test: 'test',
    //         },
    //         jobId: '12345',
    //         delay: 1000,
    //         // limit: 2,
    //       },
    //       prefix: `{${QUEUE.POLLING}}`,
    //     },
    //   ],
    // });
  });
};

[
  'SIGHUP',
  'SIGINT',
  'SIGQUIT',
  'SIGILL',
  'SIGTRAP',
  'SIGABRT',
  'SIGBUS',
  'SIGFPE',
  'SIGUSR1',
  'SIGSEGV',
  'SIGUSR2',
  'SIGTERM',
].forEach((sig) => {
  process.on(sig, async () => {
    process.exit(1);
  });
});

process.on('unhandleRejection', (err) => {
  throw err;
});

process.on('uncaughtException', async (err) => {
  console.error(err.message);
});

run();
