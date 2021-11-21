const logger = require('../utilities/logger');

class TestService {
  constructor() {}

  process() {
    const handle = logger.begin('TestService:process');
    try {
      // do something ...

      throw new Error('403 Request Failed');
    } catch (err) {
      const newErr = new Error(`TestService:process->${err.message}`);

      logger.err(handle, newErr.message);

      throw newErr;
    }
    logger.end(handle);
  }
}

module.exports = TestService;
