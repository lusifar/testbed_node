const Redis = require('ioredis');

const run = async () => {
  const nodes = [
    {
      host: 'my-release-redis-cluster',
      port: 6379,
    },
  ];

  const cluster = new Redis.Cluster(nodes, {
    redisOptions: {
      password: 'kkk',
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

// const { createCluster } = require('redis');

// const run = async () => {
//   const nodes = [
//     {
//       host: 'my-release-redis-cluster',
//       port: 6379,
//     },
//   ];

//   const cluster = createCluster({
//     rootNodes: nodes,
//   });

//   cluster.on('error', (err) => {
//     console.log(err);
//   });

//   cluster.on('connect', () => {
//     console.log('Redis is connected');
//   });

//   await cluster.connect();

//   await cluster.set(
//     'test',
//     JSON.stringify({
//       test: '123',
//     })
//   );

//   const data = await cluster.get('test');
//   console.log(JSON.parse(data));

//   setTimeout(async () => {
//     const data = await cluster.get('test');
//     console.log(data);
//   }, 5000);
// };

run();
