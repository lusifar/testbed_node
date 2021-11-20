const Redis = require('ioredis');

const { REDIS_KEY } = require('../constants');

class RedisClient {
  constructor() {
    this.client = null;
  }

  async init() {
    await new Promise((resolve, reject) => {
      this.client = new Redis();

      this.client.on('connect', () => {
        console.log('connect...');
      });

      this.client.on('ready', () => {
        resolve();
      });

      this.client.on('close', () => {
        console.log('close...');
      });

      this.client.on('error', (err) => {
        console.log(err.message);

        reject(err);
      });

      this.client.on('message', (channel, message) => {
        console.log(channel, message);
      });
    });
  }

  async set(key, value) {
    return this.client.set(key, JSON.stringify(value));
  }

  async get(key) {
    return this.client.get(key);
  }

  async pub(channel, message) {
    console.log('QQQ');

    this.client.publish(channel, message, (err, res) => {
      if (err) {
        console.log(err);
      }
      console.log(res);
    });
  }

  async sub(channel) {
    this.client.subscribe(channel, (err, data) => {
      if (err) {
        console.log('sub err on ', err.message);
      }
      console.log(data);
    });
  }
}
RedisClient._instance = null;
RedisClient.instance = () => {
  if (RedisClient._instance === null) {
    RedisClient._instance = new RedisClient();
  }
  return RedisClient._instance;
};

module.exports = RedisClient;
