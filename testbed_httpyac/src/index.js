const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');

const run = async () => {
  app.listen(process.env.APP_PORT, () => {
    console.log(`app is running on port: ${process.env.APP_PORT}`);
  });
};

run();
