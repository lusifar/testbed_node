const { Queue } = require('bullmq');

const RedisClient = require('../utilities/redisClient');

const { REDIS } = require('../constants');

const redisClient = RedisClient.instance(REDIS.HOST, REDIS.PORT);

module.exports = (queueName) => {
  return new Queue(queueName, {
    prefix: `{${queueName}}`,
    connection: redisClient.connection,
    defaultJobOptions: {
      removeOnComplete: true,
      removeOnFail: true,
    },
  });
};
