const express = require('express');

const router = express.Router();

router.get('/api/v1/bot/messages', async (req, res) => {
  return res.status(200).send([
    {
      ok: true,
      message: 'fake-message',
    },
  ]);
});

router.post('/api/v1/bot/messages', async (req, res) => {
  const { roomId, message, tmid } = req.body;

  console.log(`post the message: ${message} in room: ${roomId}`);

  return res.status(200).send({
    ok: true,
    roomId,
    message,
    tmid,
  });
});

module.exports = router;
