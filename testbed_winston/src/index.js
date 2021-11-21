// const logger = require('./utilities/logger');

// const handle = logger.begin('begin the service', {
//   class: 'rpaUtil',
//   method: 'getPASPC',
// });

// setTimeout(() => {
//   logger.err(handle);
// }, 3000);

const TestService = require('./services/testService');

const run = async () => {
  try {
    const testService = new TestService();
    testService.process();
  } catch (err) {
    console.log(err.message);
  }
};

run();
