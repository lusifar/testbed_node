const Redis = require('ioredis');

const run = async () => {
  const nodes = [
    {
      host: 'redis-node-5',
      port: 6379,
    },
  ];

  const cluster = new Redis.Cluster(nodes, {
    redisOptions: {
      password: 'bitnami',
    },
  });

  cluster.on('error', (err) => {
    console.log(err);
  });

  cluster.on('connect', () => {
    console.log('Redis is connected');
  });

  await cluster.set(
    'test',
    JSON.stringify({
      test: '123',
    }),
    'EX',
    3
  );

  const data = await cluster.get('test');
  console.log(JSON.parse(data));

  setTimeout(async () => {
    const data = await cluster.get('test');
    console.log(data);
  }, 5000);
};

run();
