const { Worker } = require('bullmq');

const pollingProcess = require('../processes/polling');
const pollingQueue = require('../queues/polling');

const RedisClient = require('../utilities/redisClient');

const { QUEUE, REDIS, JOB_STATUS, POLLING_STATUS } = require('../constants');

const redisClient = RedisClient.instance(REDIS.HOST, REDIS.PORT);

const worker = new Worker(QUEUE.POLLING, pollingProcess, {
  prefix: `{${QUEUE.POLLING}}`,
  connection: redisClient.connection,
  concurrency: 100,
  // autorun: false,
});

worker.on(JOB_STATUS.COMPLETED, async (job, returnvalue) => {
  console.log(`[POLLING_WORKER] job: ${job.id} is completed with returned value: ${JSON.stringify(returnvalue)}`);
});

worker.on(JOB_STATUS.PROGRESS, async (job, progress) => {
  console.log(`[POLLING_WORKER] job: ${job.id} is porgressing with progress number: ${progress}`);
});

worker.on(JOB_STATUS.FAILED, async (job, err) => {
  console.error(`[POLLING_WORKER] job: ${job.id} is failed with error: ${err.message}`);
});

worker.on(JOB_STATUS.ERROR, (err) => {
  console.error(`[POLLING_WORKER] ${err.message}`);
});

module.exports = worker;
