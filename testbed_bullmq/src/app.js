const express = require('express');

const { json } = require('body-parser');
const cors = require('cors');

const repeatRouter = require('./routers/v1/repeat');
const workflowRouter = require('./routers/v1/workflow');
const processRouter = require('./routers/v1/process');

const app = express();

app.use(json());
app.use(cors());
app.use('/', repeatRouter);
app.use('/', workflowRouter);
app.use('/', processRouter);

module.exports = app;
