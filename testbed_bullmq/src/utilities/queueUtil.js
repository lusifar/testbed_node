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

const converToFlowJob = (workflow) => {
  try {
    if (workflow.length === 0) {
      throw new Error('the workflow is empty');
    }

    // reverse the workflow first to let first one as last child
    workflow.reverse();

    let parentJob = null;
    let currentJob = null;
    let lastJob = null;
    workflow.forEach((worker) => {
      currentJob = {
        name: worker.name,
        queueName: worker.queueName,
        data: worker.data,
        prefix: `{${worker.queueName}}`,
        children: [],
      };

      if (!parentJob) {
        parentJob = currentJob;
        lastJob = currentJob;
      } else {
        lastJob.children.push(currentJob);
        lastJob = currentJob;
      }
    });

    return parentJob;
  } catch (err) {
    console.error(err.message);

    throw err;
  }
};

module.exports = {
  genRepeatOptions,
  getRepeatableJob,
  removeRepeatableJob,
  converToFlowJob,
};
