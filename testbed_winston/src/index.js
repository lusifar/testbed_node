const logger = require('./utilities/logger');

const handle = logger.begin('begin the service', {
  service: 'rpaUtil',
  function: 'getPASPC',
});

setTimeout(() => {
  logger.err(handle);
}, 3000);
