const axios = require('axios');
const { Worker } = require('bullmq');

const repeatQueue = require('../queues/repeat');

const { removeRepeatableJob } = require('../utilities/queueUtil');
const RedisClient = require('../utilities/redisClient');

const { QUEUE, REDIS, JOB_STATUS, POLLING_STATUS } = require('../constants');

const redisClient = RedisClient.instance(REDIS.HOST, REDIS.PORT);

const worker = new Worker(
  QUEUE.REPEAT,
  async (job) => {
    try {
      const { endpoint, payload, headers, jobId } = job.data;
      if (!endpoint || !payload || !jobId) {
        throw Error('the required parameters are not existed');
      }

      const { data } = await axios.post(endpoint, payload, {
        ...(headers ? { headers } : {}),
      });

      return {
        jobId,
        data: data.data,
      };
    } catch (err) {
      throw err;
    }
  },
  {
    prefix: `{${QUEUE.REPEAT}}`,
    connection: redisClient.connection,
    // autorun: false,
  }
);

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
