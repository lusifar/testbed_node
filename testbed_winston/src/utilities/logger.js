const moment = require('moment');
const uuidv4 = require('uuid').v4;
const NodeCache = require('node-cache');
const { createLogger, format, transports } = require('winston');
const { timestamp, printf, combine, splat, label } = format;

const customFormat = printf(({ timestamp, label, message, level, ...metadata }) => {
  return `${timestamp} [${label}] (${level}) ${message} ${JSON.stringify(metadata)}`;
});

const logger = createLogger({
  level: 'debug',
  format: combine(
    timestamp(),
    label({
      label: 'DEFECT_FLOW',
      message: false,
    }),
    splat(),
    customFormat
  ),
  transports: [new transports.Console({ level: 'debug' })],
});

logger.cache = new NodeCache();

logger.begin = (message, metadata) => {
  const handle = uuidv4();
  logger.cache.set(handle, {
    ts: moment(),
    metadata,
  });

  logger.info(message, { loggerState: 'begin', ...metadata });

  return handle;
};

logger.end = (handle) => {
  const cacheData = logger.cache.get(handle);
  if (cacheData === undefined) {
    return;
  }
  logger.cache.del(handle);

  const duration = moment().diff(cacheData.ts);
  logger.info('', { loggerState: 'end', duration, ...cacheData.metadata });
};

logger.err = (handle) => {
  const cacheData = logger.cache.get(handle);
  if (cacheData === undefined) {
    return;
  }
  logger.cache.del(handle);

  const duration = moment().diff(cacheData.ts);
  logger.error('', { loggerState: 'err', duration, ...cacheData.metadata });
};

module.exports = logger;
