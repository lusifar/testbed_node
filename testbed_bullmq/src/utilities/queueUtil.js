const genRepeatOptions = (jobId, delay, limit = null) => {
  return {
    repeat: { every: +delay, ...(limit ? { limit } : {}) },
    jobId: jobId,
  };
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
  getRepeatableJob,
  removeRepeatableJob,
};
