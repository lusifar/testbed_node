const IORedis = require('ioredis');

class RedisClient {
  constructor(host, port) {
    this.connection = new IORedis({
      host,
      port,
      maxRetriesPerRequest: null,
    });
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
