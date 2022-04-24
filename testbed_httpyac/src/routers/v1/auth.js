const express = require('express');

const router = express.Router();

router.post('/api/v1/auth', async (req, res) => {
  const { project, owner } = req.body;

  const accessToken = 'fake-access-token';

  console.log(`get the accessToken: ${accessToken} from project: ${project} and owner: ${owner}`);

  return res.status(200).send({
    ok: true,
    accessToken,
  });
});

module.exports = router;
