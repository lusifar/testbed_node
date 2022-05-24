const axios = require('axios');
const { Worker } = require('bullmq');

const pollingQueue = require('../queues/polling');

const { removeRepeatableJob } = require('../utilities/queueUtil');
const RedisClient = require('../utilities/redisClient');

const { QUEUE, REDIS, JOB_STATUS, POLLING_STATUS } = require('../constants');

const redisClient = RedisClient.instance(REDIS.HOST, REDIS.PORT);

const worker = new Worker(
  QUEUE.POLLING,
  async (job) => {
    try {
      const { endpoint, payload, headers, jobId, delay } = job.data;

      if (!endpoint || !payload || !jobId || !delay) {
        throw Error('the required parameters are not existed');
      }

      const res = await new Promise((resolve, reject) => {
        const handler = setInterval(async () => {
          try {
            const { data } = await axios.post(endpoint, payload, {
              ...(headers ? { headers } : {}),
            });

            if (data.data.status === POLLING_STATUS.SUCCESS) {
              clearInterval(handler);

              resolve({
                jobId,
              });
            } else if (data.data.status === POLLING_STATUS.FAULTED) {
              clearInterval(handler);

              reject(new Error(data.message));
            }
          } catch (err) {
            reject(err);
          }
        }, delay);
      });

      return res;
    } catch (err) {
      throw err;
    }
  },
  {
    prefix: `{${QUEUE.POLLING}}`,
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
