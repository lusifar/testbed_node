const axios = require('axios');

module.exports = async (job) => {
  try {
    const { endpoint, payload, headers, jobId } = job.data;
    if (!endpoint || !payload || !jobId) {
      throw Error('the required parameters are not existed');
    }

    const { data } = await axios.post(endpoint, payload, {
      ...(headers ? { headers } : {}),
    });

    console.log(`[REPEAT_PROCESS] ${job.id}, ${JSON.stringify(data)}`);

    return {
      jobId,
      data: data.data,
    };
  } catch (err) {
    throw err;
  }
};
