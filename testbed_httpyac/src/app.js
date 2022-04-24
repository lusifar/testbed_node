const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');

const botRouter = require('./routers/v1/bot');
const authRouter = require('./routers/v1/auth');

const app = express();

app.use(json());
app.use(cors());
app.use('', botRouter);
app.use('', authRouter);

module.exports = app;
