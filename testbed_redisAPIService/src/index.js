const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');

app.listen(process.env.APP_SERVICE_PORT, () => {
  console.log(`app is running on ${process.env.APP_SERVICE_PORT}`);
});
