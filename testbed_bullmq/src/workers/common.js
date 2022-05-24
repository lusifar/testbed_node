const axios = require('axios');
const { Worker } = require('bullmq');

const commonQueue = require('../queues/common');

const RedisClient = require('../utilities/redisClient');

const { QUEUE, REDIS, JOB_STATUS } = require('../constants');

const redisClient = RedisClient.instance(REDIS.HOST, REDIS.PORT);

const worker = new Worker(
  QUEUE.COMMON,
  async (job) => {
    try {
      const res = await new Promise((resolve, reject) => {
        setTimeout(async () => {
          resolve({ test: '1234' });
        }, 2000);
      });

      return res;
    } catch (err) {
      throw err;
    }
  },
  {
    prefix: `{${QUEUE.COMMON}}`,
    connection: redisClient.connection,
    // autorun: false,
  }
);

worker.on(JOB_STATUS.COMPLETED, async (job, returnvalue) => {
  console.log(`job: ${job.id} is completed with returned value: ${JSON.stringify(returnvalue)}`);
});

worker.on(JOB_STATUS.PROGRESS, (job, progress) => {
  console.log(`job: ${job.id} is porgressing with progress number: ${progress}`);
});

worker.on(JOB_STATUS.FAILED, (job, err) => {
  console.error(`job: ${job.id} is failed with error: ${err.message}`);
});

worker.on(JOB_STATUS.ERROR, (err) => {
  console.error(err.message);
});

module.exports = worker;
