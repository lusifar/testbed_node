const axios = require('axios');
const { Worker } = require('bullmq');

const commonQueue = require('../queues/common');

const RedisClient = require('../utilities/redisClient');

const { QUEUE, REDIS, JOB_STATUS, POLLING_STATUS } = require('../constants');

const redisClient = RedisClient.instance(REDIS.HOST, REDIS.PORT);

const commonProcess = require('../processes/common');

const worker = new Worker(QUEUE.COMMON, commonProcess, {
  prefix: `{${QUEUE.COMMON}}`,
  connection: redisClient.connection,
  concurrency: 10,
  // autorun: false,
});

worker.on(JOB_STATUS.COMPLETED, async (job, returnvalue) => {
  console.log(`[COMMOM_WORKER] job: ${job.id} is completed with returned value: ${JSON.stringify(returnvalue)}`);
});

worker.on(JOB_STATUS.PROGRESS, (job, progress) => {
  console.log(`[COMMOM_WORKER] job: ${job.id} is porgressing with progress number: ${progress}`);
});

worker.on(JOB_STATUS.FAILED, (job, err) => {
  console.error(`[COMMOM_WORKER] job: ${job.id} is failed with error: ${err.message}`);
});

worker.on(JOB_STATUS.ERROR, (err) => {
  console.error(`[COMMOM_WORKER] ${err.message}`);
});

module.exports = worker;
