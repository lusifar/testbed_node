const { FlowProducer } = require('bullmq');

const RedisClient = require('./utilities/redisClient');

const repeatQueue = require('./queues/repeat');
const pollingQueue = require('./queues/polling');
const commonQueue = require('./queues/common');
const schedulerRepeatQueue = require('./queues/schedulerRepeat');
const schedulerRepeatCommon = require('./queues/schedulerCommon');

const repeatWorker = require('./workers/repeat');
const pollingWorker = require('./workers/polling');
const commonWorker = require('./workers/common');
const factoryWorker = require('./workers/factory');

const pollingProcess = require('./processes/polling');

const { APP, REDIS, QUEUE } = require('./constants');

const { removeAllJobs } = require('./utilities/queueUtil');

const app = require('./app');

const run = async () => {
  app.listen(APP.PORT, async () => {
    console.log(`the app is running on port: ,${APP.PORT}`);

    global.flowProducer = new FlowProducer();
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
