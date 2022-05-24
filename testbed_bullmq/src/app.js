const express = require('express');

const { json } = require('body-parser');
const cors = require('cors');

const jobRepeatRouter = require('./routers/v1/repeat');
const jobPollingRouter = require('./routers/v1/polling');
const jobProcessRouter = require('./routers/v1/process');

const app = express();

app.use(json());
app.use(cors());
app.use('/', jobRepeatRouter);
app.use('/', jobPollingRouter);
app.use('/', jobProcessRouter);

module.exports = app;
