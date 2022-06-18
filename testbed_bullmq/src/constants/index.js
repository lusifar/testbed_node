module.exports = {
  APP: {
    PORT: 3030,
  },
  REDIS: {
    HOST: '127.0.0.1',
    PORT: 6379,
  },
  QUEUE: {
    REPEAT: 'REPEAT',
    POLLING: 'POLLING',
    COMMON: 'COMMON',
  },
  JOB_STATUS: {
    COMPLETED: 'completed',
    FAILED: 'failed',
    PROGRESS: 'progress',
    ERROR: 'error',
  },
  COMMON_STATUS: {
    SUCCESS: 'SUCCESS',
    PROCESSING: 'PROCESSING',
    FAULTED: 'FAULTED',
  },
};
