const axios = require('axios');
const { Worker } = require('bullmq');

const RedisClient = require('../utilities/redisClient');

const pollingProcess = require('../processes/polling');

const { REDIS, JOB_STATUS } = require('../constants');

const redisClient = RedisClient.instance(REDIS.HOST, REDIS.PORT);

module.exports = (queueName) => {
  const worker = new Worker(queueName, pollingProcess, {
    prefix: `{${queueName}}`,
    connection: redisClient.connection,
    // autorun: false,
  });

  worker.on(JOB_STATUS.COMPLETED, async (job, returnvalue) => {
    console.log(`[FACTORY_WORKER] job: ${job.id} is completed with returned value: ${JSON.stringify(returnvalue)}`);
  });

  worker.on(JOB_STATUS.PROGRESS, (job, progress) => {
    console.log(`[FACTORY_WORKER] job: ${job.id} is porgressing with progress number: ${progress}`);
  });

  worker.on(JOB_STATUS.FAILED, (job, err) => {
    console.error(`[FACTORY_WORKER] job: ${job.id} is failed with error: ${err.message}`);
  });

  worker.on(JOB_STATUS.ERROR, (err) => {
    console.error(`[FACTORY_WORKER] ${err.message}`);
  });

  return worker;
};
