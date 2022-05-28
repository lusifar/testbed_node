const express = require('express');

const { COMMON_STATUS } = require('../../constants');

const router = express.Router();

router.post('/api/v1/job/process', async (req, res) => {
  try {
    const payload = req.body;

    const factor = Math.floor(Math.random() * 100);

    let data = { status: COMMON_STATUS.PROCESSING };
    if (factor > 70) {
      data.status = COMMON_STATUS.SUCCESS;
    } else if (factor < 20) {
      throw new Error('something is wrong');
    }

    return res.status(200).send({
      ok: true,
      data,
    });
  } catch (err) {
    return res.status(500).send({
      ok: false,
      data: {
        status: COMMON_STATUS.FAULTED,
      },
      message: err.message,
    });
  }
});

module.exports = router;
