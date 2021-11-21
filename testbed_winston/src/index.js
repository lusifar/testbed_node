const logger = require('./utilities/logger');

const handle = logger.begin('begin the service', {
  class: 'rpaUtil',
  method: 'getPASPC',
});

setTimeout(() => {
  logger.err(handle);
}, 3000);
