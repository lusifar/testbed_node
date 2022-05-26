const RedisClient = require('./utilities/redisClient');

const { REDIS } = require('./constants');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const run = async () => {
  try {
    const redisClient = RedisClient.instance(REDIS.HOST, REDIS.PORT);

    const key = 'testKey';
    const object = {
      test: 'test',
    };

    const ttl = 20000;
    const lock = await redisClient.acquireLock(`lock:${key}`, ttl);
    console.log('Lock acquired...');

    await redisClient.setObject(key, object);
    console.log(`Set key=${key} value=${JSON.stringify(object)}...`);

    console.log('Waiting some time...');
    await sleep(10000);
    console.log('Time finished, key unlocked...');
    await redisClient.releaseLock(lock);

    console.log('Done...');
  } catch (err) {
    console.error(err.message);
  }
};

run();
