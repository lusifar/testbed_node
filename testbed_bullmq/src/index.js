const pollingQueue = require('./queues/polling');
const schedulerQueue = require('./queues/scheduler');
const pollingWorker = require('./workers/polling');

const { APP } = require('./constants');

const app = require('./app');

const run = async () => {
  app.listen(APP.PORT, async () => {
    console.log(`the app is running on port: ${APP.PORT}`);

    // pollingWorker.run();
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
    // const repeatableJobs = await pollingQueue.getRepeatableJobs();
    // for (let job of repeatableJobs) {
    //   await pollingQueue.removeRepeatableByKey(job.key);
    // }
    // await pollingQueue.drain();
    // await pollingQueue.close();

    // await schedulerQueue.close();

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
