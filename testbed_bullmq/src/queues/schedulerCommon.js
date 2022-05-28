const { QueueScheduler } = require('bullmq');

const RedisClient = require('../utilities/redisClient');

const { QUEUE, REDIS } = require('../constants');

const redisClient = RedisClient.instance(REDIS.HOST, REDIS.PORT);

module.exports = new QueueScheduler(QUEUE.COMMON, {
  prefix: `{${QUEUE.COMMON}}`,
  connection: redisClient.connection,
});
