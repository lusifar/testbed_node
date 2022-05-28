const axios = require('axios');

const { POLLING_STATUS } = require('../constants');

module.exports = async (job) => {
  try {
    const { endpoint, payload, headers, delay, limit } = job.data;

    if (!endpoint || !payload || !delay) {
      throw Error('the required parameters are not existed');
    }

    let count = 0;
    const res = await new Promise((resolve, reject) => {
      const handler = setInterval(async () => {
        try {
          //   // trick to remove the interval in illegal state
          //   const state = await job.getState();
          //   if (state !== 'active') {
          //     clearInterval(handler);
          //     return;
          //   }

          const { data } = await axios.post(endpoint, payload, {
            ...(headers ? { headers } : {}),
          });

          console.log(`[POLLING_PROCESS] ${job.id}, ${JSON.stringify(data)}`);

          if (data.data.status === POLLING_STATUS.SUCCESS) {
            clearInterval(handler);

            resolve({
              data: data.data,
            });
          } else if (data.data.status === POLLING_STATUS.FAULTED) {
            throw new Error(data.message);
          }

          if (limit) {
            count += 1;
            if (count >= limit) {
              clearInterval(handler);

              resolve({
                data: {
                  status: POLLING_STATUS.SUCCESS,
                },
              });
            }
          }
        } catch (err) {
          clearInterval(handler);

          reject(err);
        }
      }, delay);
    });

    return res;
  } catch (err) {
    throw err;
  }
};
