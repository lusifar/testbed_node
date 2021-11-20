const dotenv = require('dotenv');
dotenv.config();

const RedisClient = require('./utilities/redisClient');
const redisClient = RedisClient.instance();

const run = require('./app');

run(redisClient).then((app) => {
  app.listen(process.env.APP_SERVICE_PORT, () => {
    console.log(`app is running on ${process.env.APP_SERVICE_PORT}`);
  });
});
