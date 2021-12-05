const moment = require('moment');
const uuidv4 = require('uuid').v4;
const NodeCache = require('node-cache');
const { createLogger, transports } = require('winston');
const ecsFormat = require('@elastic/ecs-winston-format');
const { ElasticsearchTransport } = require('winston-elasticsearch');

const logger = createLogger({
  level: 'debug',
  format: ecsFormat(),
  transports: [
    new transports.Console({ level: 'debug' }),
    new ElasticsearchTransport({
      level: 'debug',
      clientOpts: {
        node: 'http://localhost:9200',
      },
    }),
  ],
});

logger.cache = new NodeCache();

const getDelHandleData = (handle) => {
  const cacheData = logger.cache.get(handle);
  if (cacheData === undefined) {
    return null;
  }
  logger.cache.del(handle);

  return cacheData;
};

logger.begin = (metadata, message = '') => {
  const handle = uuidv4();
  logger.cache.set(handle, {
    ts: moment(),
    metadata,
  });

  logger.info(message, { _status: 'begin', ...metadata });

  return handle;
};

logger.end = (handle, message = '') => {
  const cacheData = getDelHandleData(handle);
  if (!cacheData) return;

  const duration = moment().diff(cacheData.ts);
  logger.info(message, { _status: 'end', _duration: duration, ...cacheData.metadata });
};

logger.fail = (handle, error, message = '') => {
  const cacheData = getDelHandleData(handle);
  if (!cacheData) return;

  const duration = moment().diff(cacheData.ts);
  logger.error(message, { err: error, _status: 'fail', _duration: duration, ...cacheData.metadata });
};

module.exports = logger;
