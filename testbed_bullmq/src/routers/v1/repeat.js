const uuidv4 = require('uuid').v4;
const express = require('express');

const router = express.Router();

const repeatQueue = require('../../queues/repeat');

const { genRepeatOptions, getRepeatableJob } = require('../../utilities/queueUtil');

router.get('/api/v1/queue/repeat', async (req, res) => {
  try {
    const { jobId } = req.query;

    // get the data by returning all jobs or getting the specific job
    let data = null;
    if (jobId) {
      data = await getRepeatableJob(repeatQueue, jobId);
    } else {
      data = await repeatQueue.getRepeatableJobs();
    }

    return res.status(200).send({
      ok: true,
      data,
    });
  } catch (err) {
    console.error(err.message);

    return res.status(500).send({
      ok: false,
      message: err.message,
    });
  }
});

router.post('/api/v1/queue/repeat', async (req, res) => {
  const { name, endpoint, headers, payload, delay, limit } = req.body;
  try {
    if (!name || !endpoint || !payload || !delay) {
      throw new Error('the required parameters are not existed');
    }

    // generate the repeat options
    const jobId = uuidv4();
    const repeatOpts = genRepeatOptions(jobId, delay, limit);

    // add the job as repeatable style
    await repeatQueue.add(
      name,
      {
        endpoint,
        headers,
        payload,
        jobId,
      },
      repeatOpts
    );

    return res.status(200).send({
      ok: true,
      data: jobId,
    });
  } catch (err) {
    console.error(err.message);

    return res.status(500).send({
      ok: false,
      message: err.message,
    });
  }
});

module.exports = router;
