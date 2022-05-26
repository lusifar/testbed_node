const express = require('express');

const { converToFlowJob } = require('../../utilities/queueUtil');

const router = express.Router();

router.post('/api/v1/workflow', async (req, res) => {
  try {
    const payload = req.body;

    const flowJob = converToFlowJob(payload);
    const flow = await global.flowProducer.add(flowJob);

    return res.status(200).send({
      ok: true,
      data: flow,
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
