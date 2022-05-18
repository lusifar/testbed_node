const { QueueScheduler } = require('bullmq');

const { QUEUE, REDIS } = require('../constants');

module.exports = new QueueScheduler(QUEUE.POLLING, {
  connection: {
    host: REDIS.HOST,
    port: REDIS.PORT,
    maxRetriesPerRequest: null,
  },
});
