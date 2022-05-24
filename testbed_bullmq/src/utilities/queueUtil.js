const genRepeatOptions = (jobId, delay, limit = null) => {
  return {
    repeat: { every: +delay, ...(limit ? { limit } : {}) },
    jobId: jobId,
  };
};

const getJob = async (queue, jobId) => {
  const job = await queue.getJob(jobId);
  return job;
};

const removeJob = async (queue, jobId) => {
  const res = await queue.remove(jobId);

  if (res > 0) {
    return true;
  }
  return false;
};

const getRepeatableJob = async (queue, jobId) => {
  const jobs = await queue.getRepeatableJobs();

  // get the data by returning all jobs or getting the specific job
  const job = jobs.find((job) => {
    if (job.id === jobId) {
      return true;
    }
  });

  return job;
};

const removeRepeatableJob = async (queue, jobId) => {
  try {
    // remove the repeatable job by jobId
    const jobs = await queue.getRepeatableJobs();
    for (let job of jobs) {
      if (job.id === jobId) {
        await queue.removeRepeatableByKey(job.key);
      }
    }

    return true;
  } catch (err) {
    console.error(err.message);

    return false;
  }
};

module.exports = {
  genRepeatOptions,
  getJob,
  removeJob,
  getRepeatableJob,
  removeRepeatableJob,
};
