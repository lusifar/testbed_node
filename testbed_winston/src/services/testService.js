const logger = require('../utilities/logger_ecs');

class TestService {
  constructor() {}

  process() {
    const handle = logger.begin({ module: 'TestService', method: 'process' }, 'begin processing...');
    try {
      let count = 0;

      const handle = setInterval(() => {
        if (count === 100) {
          clearInterval(handle);
        }

        if (count % 17 === 0) {
        } else {
          logger.info(`the count value is: ${count}`, { module: 'TestService', method: 'process', count });
        }

        count += 1;
      }, 1000);

      //   throw new Error('403 Request Failed');
    } catch (err) {
      logger.error('something wrong', { err });
    }
    logger.end(handle, 'end processing...');
  }
}

module.exports = TestService;
