const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');

const { REDIS_KEY } = require('./constants');

const app = express();

app.use(json());
app.use(cors());

app.post('/api/v1/redis/set', async (req, res) => {
  const { key, value } = req.body;

  const data = await app.redisClient.set(key, value);
  res.sendStatus(200).send(data);
});

app.get('/api/v1/redis/get/:key', async (req, res) => {
  const key = req.params.key;

  const data = await app.redisClient.get(key);

  setTimeout(() => {
    console.log('done');
  }, 5000);

  res.status(200).send(data);
});

app.post('/api/v1/redis/pub', async (req, res) => {
  const { channel, message } = req.body;

  console.log(req.body);

  const data = await app.redisClient.pub(channel, JSON.stringify(message));
  res.sendStatus(200).send(data);
});

app.post('/api/v1/redis/sub', async (req, res) => {
  const { channel, endpoint } = req.body;

  const data = await app.redisClient.get(REDIS_KEY.CHANNEL);
  if (!data) {
    console.log('KKKKKKKKK');
    data = {};
    data[channel] = endpoint;
  }
  await app.redisClient.set(REDIS_KEY.CHANNEL, data);
});

app.get('/api/v1/healthy', (req, res) => {
  res.sendStatus(200).send('ok');
});

module.exports = (redisClient) => {
  return redisClient.init().then(() => {
    app.redisClient = redisClient;
    return app;
  });
};
