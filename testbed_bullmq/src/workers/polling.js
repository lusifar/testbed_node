const axios = require('axios');
const { Worker } = require('bullmq');

const pollingQueue = require('../queues/polling');

const { removeRepeatableJob } = require('../utilities/queueUtil');

const { QUEUE, REDIS, JOB_STATUS, POLLING_STATUS } = require('../constants');

const worker = new Worker(
  QUEUE.POLLING,
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
        status: data.data,
      };
    } catch (err) {
      throw err;
    }
  },
  {
    connection: { host: REDIS.HOST, port: REDIS.PORT, maxRetriesPerRequest: null },
    // autorun: false,
  }
);

worker.on(JOB_STATUS.COMPLETED, async (job, returnvalue) => {
  console.log(`job: ${job.id} is completed with returned value: ${JSON.stringify(returnvalue)}`);

  const { jobId, status } = returnvalue;

  if (status === POLLING_STATUS.SUCCESS) {
    // remove the repeatable job
    await removeRepeatableJob(pollingQueue, jobId);
  }
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
