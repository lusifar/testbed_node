const { Queue } = require('bullmq');

const { QUEUE, REDIS } = require('../constants');

module.exports = new Queue(QUEUE.POLLING, {
  connection: {
    host: REDIS.HOST,
    port: REDIS.PORT,
    maxRetriesPerRequest: null,
  },
  defaultJobOptions: {
    removeOnComplete: true,
  },
});
