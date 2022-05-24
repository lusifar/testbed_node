const express = require('express');

const { POLLING_STATUS } = require('../../constants');

const router = express.Router();

router.post('/api/v1/job/process', async (req, res) => {
  try {
    const payload = req.body;

    const factor = Math.floor(Math.random() * 100);

    let data = { status: POLLING_STATUS.PROCESSING };
    if (factor > 70) {
      data.status = POLLING_STATUS.SUCCESS;
    } else if (factor < 20) {
      throw new Error('something is wrong');
    }

    return res.status(200).send({
      ok: true,
      data,
    });
  } catch (err) {
    console.error(err.message);

    return res.status(500).send({
      ok: false,
      data: {
        status: POLLING_STATUS.FAULTED,
      },
      message: err.message,
    });
  }
});

module.exports = router;
