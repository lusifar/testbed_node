const { Queue } = require('bullmq');

const RedisClient = require('../utilities/redisClient');

const { QUEUE, REDIS } = require('../constants');

const redisClient = RedisClient.instance(REDIS.HOST, REDIS.PORT);

module.exports = new Queue(QUEUE.COMMON, {
  prefix: `{${QUEUE.COMMON}}`,
  connection: redisClient.connection,
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: true,
  },
});
