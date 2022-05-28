const axios = require('axios');

const commonQueue = require('../queues/common');

const { COMMON_STATUS } = require('../constants');

module.exports = async (job) => {
  try {
    const { endpoint, payload, headers } = job.data;
    if (!endpoint || !payload) {
      throw Error('the required parameters are not existed');
    }

    const { data } = await axios.post(endpoint, payload, {
      ...(headers ? { headers } : {}),
    });

    console.log(`[COMMON_PROCESS] ${job.id}, ${JSON.stringify(data)}`);

    const { mq } = data.data;

    if (mq.status === COMMON_STATUS.SUCCESS) {
      return { status: mq.status };
    } else if (mq.status === COMMON_STATUS.FAULTED) {
      throw new Error('common process response faulted result');
    } else if (mq.status === COMMON_STATUS.PROCESSING) {
      const newJob = await commonQueue.add(job.name, job.data, {
        ...job.opts,
        ...(mq.jobId ? { jobId: mq.jobId } : {}),
        ...(mq.delay ? { delay: mq.delay } : { delay: 60 * 1000 }),
      });

      return { jobId: newJob.id, status: mq.status };
    }
  } catch (err) {
    throw err;
  }
};
