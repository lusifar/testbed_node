const axios = require('axios');
const moment = require('moment');

const commonQueue = require('../queues/common');

const { populatePayload } = require('../utilities/queueUtil');

const { COMMON_STATUS } = require('../constants');

module.exports = async (job) => {
  try {
    const { endpoint, payload, headers } = job.data;
    if (!endpoint || !payload) {
      throw Error('the required parameters are not existed');
    }

    // get the successful child output
    const newPayload = await populatePayload(job, payload);

    const { data } = await axios.post(endpoint, newPayload, {
      ...(headers ? { headers } : {}),
    });

    console.log(`[COMMON_PROCESS] ${job.id}, ${JSON.stringify(data)}`);

    const { output, mq } = data.data;

    if (mq.status === COMMON_STATUS.SUCCESS) {
      return { jobId: job.id, status: COMMON_STATUS.SUCCESS, output };
    } else if (mq.status === COMMON_STATUS.FAULTED) {
      throw new Error('common process response faulted result');
    } else if (mq.status === COMMON_STATUS.PROCESSING) {
      const newJob = await commonQueue.add(
        job.name,
        { endpoint, payload: newPayload, headers },
        {
          ...job.opts,
          ...(mq.jobId ? { jobId: mq.jobId } : {}),
          ...(mq.delay ? { delay: mq.delay } : { delay: 60 * 1000 }),
        }
      );

      return { jobId: newJob.id, status: COMMON_STATUS.PROCESSING };
    }
  } catch (err) {
    throw err;
  }
};
