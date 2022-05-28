const uuidv4 = require('uuid').v4;
const express = require('express');

const router = express.Router();

const pollingQueue = require('../../queues/polling');

router.get('/api/v1/queue/polling', async (req, res) => {
  try {
    const { jobId } = req.query;

    // get the data by returning all jobs or getting the specific job
    let data = null;
    if (jobId) {
      data = await pollingQueue.getJob(jobId);
    } else {
      data = await pollingQueue.getJobs();
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

router.post('/api/v1/queue/polling', async (req, res) => {
  const { name, endpoint, headers, payload, delay } = req.body;
  try {
    if (!name || !endpoint || !payload || !delay) {
      throw new Error('the required parameters are not existed');
    }

    // add the job as repeatable style
    const job = await pollingQueue.add(name, {
      endpoint,
      headers,
      payload,
      delay,
    });

    return res.status(200).send({
      ok: true,
      data: job,
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
