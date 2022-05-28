const { Worker } = require('bullmq');

const repeatQueue = require('../queues/repeat');
const repeatProcess = require('../processes/repeat');

const { removeRepeatableJob } = require('../utilities/queueUtil');
const RedisClient = require('../utilities/redisClient');

const { QUEUE, REDIS, JOB_STATUS, POLLING_STATUS } = require('../constants');

const redisClient = RedisClient.instance(REDIS.HOST, REDIS.PORT);

const worker = new Worker(QUEUE.REPEAT, repeatProcess, {
  prefix: `{${QUEUE.REPEAT}}`,
  connection: redisClient.connection,
  concurrency: 100,
  // autorun: false,
});

worker.on(JOB_STATUS.COMPLETED, async (job, returnvalue) => {
  console.log(`[REPEAT_WORKER] job: ${job.id} is completed with returned value: ${JSON.stringify(returnvalue)}`);

  const { jobId, data } = returnvalue;

  if (data.status === POLLING_STATUS.SUCCESS) {
    // remove the repeatable job
    await removeRepeatableJob(repeatQueue, jobId);
  }
});

worker.on(JOB_STATUS.PROGRESS, (job, progress) => {
  console.log(`[REPEAT_WORKER] job: ${job.id} is porgressing with progress number: ${progress}`);
});

worker.on(JOB_STATUS.FAILED, (job, err) => {
  console.error(`[REPEAT_WORKER] job: ${job.id} is failed with error: ${err.message}`);
});

worker.on(JOB_STATUS.ERROR, (err) => {
  console.error(`[REPEAT_WORKER] ${err.message}`);
});

module.exports = worker;
