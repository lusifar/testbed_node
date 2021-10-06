const express = require('express');

const { json } = require('body-parser');
const cors = require('cors');

const app = express();

app.use(json());
app.use(cors());

app.get('/api/v1/healthy', (req, res) => {
  res.status(200).send('ok');
});

module.exports = app;
