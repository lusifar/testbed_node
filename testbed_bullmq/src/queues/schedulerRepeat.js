const { QueueScheduler } = require('bullmq');

const RedisClient = require('../utilities/redisClient');

const { QUEUE, REDIS } = require('../constants');

const redisClient = RedisClient.instance(REDIS.HOST, REDIS.PORT);

module.exports = new QueueScheduler(QUEUE.REPEAT, {
  prefix: `{${QUEUE.REPEAT}}`,
  connection: redisClient.connection,
});
