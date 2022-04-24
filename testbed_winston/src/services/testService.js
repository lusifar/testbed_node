const logger = require('../utilities/logger');

class TestService {
  constructor() {}

  process() {
    const handle = logger.begin({ module: 'TestService', method: 'process' }, 'begin processing...');

    return new Promise((resolve, reject) => {
      let count = 0;

      const goal = Math.random() * 100;
      const errGoal = Math.random() * 100;

      console.log(goal, errGoal);

      const intervalHandle = setInterval(() => {
        if (count >= goal) {
          logger.end(handle, 'end processing...');
          clearInterval(intervalHandle);
        }

        if (count >= errGoal) {
          logger.fail(handle, 'Something wrong...');
          clearInterval(intervalHandle);

          reject(new Error('Something wrong...'));
        }

        logger.info(`the count value is: ${count}`, {
          module: 'TestService',
          method: 'process',
          value: Math.random() * 10,
          count,
        });

        count += 1;
      }, 1000);

      resolve();
    });
  }
}

module.exports = TestService;
