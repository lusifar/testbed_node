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

    if (data.data.status === COMMON_STATUS.SUCCESS) {
      return { id: job.id, status: data.data.status };
    } else if (data.data.status === COMMON_STATUS.FAULTED) {
      throw new Error('common process has something wrong');
    } else if (data.data.status === COMMON_STATUS.PROCESSING) {
      await commonQueue.add(job.name, job.data, { ...job.opts, delay: 2000 });

      return { id: job.id, status: data.data.status };
    }
  } catch (err) {
    throw err;
  }
};
