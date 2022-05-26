const IORedis = require('ioredis');
const Redlock = require('redlock').default;

class RedisClient {
  constructor(host, port) {
    this.client = new IORedis({
      host,
      port,
      maxRetriesPerRequest: null,
    });

    this.redlock = new Redlock([this.client], {
      driftFactor: 0.01,
      retryCount: -1,
      retryDelay: 200,
      retryJitter: 200,
    });

    this.redlock.on('clientError', (err) => {
      console.error('A redis error has occurred:', err);
    });
  }

  async getObject(key) {
    try {
      const data = await this.client.get(key);
      if (!data) {
        return null;
      }
      return JSON.parse(data);
    } catch (err) {
      console.error(err.message);

      throw err;
    }
  }

  async setObject(key, obj, expireInSeconds = null) {
    try {
      let res = null;
      if (expireInSeconds) {
        res = await this.client.set(key, JSON.stringify(obj), 'EX', expireInSeconds);
      } else {
        res = await this.client.set(key, JSON.stringify(obj));
      }

      if (res === 'OK') {
        return true;
      }
      return false;
    } catch (err) {
      console.error(err.message);

      throw err;
    }
  }

  async acquireLock(resource, ttl) {
    try {
      const lock = await this.redlock.acquire([resource], ttl);

      return lock;
    } catch (err) {
      console.error(err.message);

      throw err;
    }
  }

  async releaseLock(lock) {
    try {
      await lock.release();
    } catch (err) {
      console.error(err.message);

      throw err;
    }
  }
}

RedisClient._instance = null;
RedisClient.instance = (url, port) => {
  if (RedisClient._instance === null) {
    RedisClient._instance = new RedisClient(url, port);
  }
  return RedisClient._instance;
};

module.exports = RedisClient;
