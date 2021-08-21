const opentelemetry = require('@opentelemetry/api');
const { ResourceAttributes } = require('@opentelemetry/semantic-conventions');

const { NodeTracerProvider } = require('@opentelemetry/node');
const { ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');

const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { WinstonInstrumentation } = require('@opentelemetry/instrumentation-winston');

// setup the OpenTelemetry for console and jaeger
const provider = new NodeTracerProvider({
  resource: {
    attributes: {
      [ResourceAttributes.SERVICE_NAME]: 'main_app',
    },
  },
});

const consoleExporter = new ConsoleSpanExporter();
const consoleSpanProcessor = new SimpleSpanProcessor(consoleExporter);

const jaegerExporter = new JaegerExporter({
  tags: [
    {
      key: 'service.name',
      value: 'main_app',
    },
  ],
  host: 'localhost',
  port: 6832,
  maxPacketSize: 65000,
});
const jaegerSpanProcessor = new SimpleSpanProcessor(jaegerExporter);

provider.addSpanProcessor(consoleSpanProcessor);
provider.addSpanProcessor(jaegerSpanProcessor);
provider.register();

// auto instrumentation
registerInstrumentations({
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
    new WinstonInstrumentation({
      logHook: (record, span) => {
        record['resource.service.name'] = provider.resource.attributes['service.name'];
      },
    }),
  ],
});

const logger = require('../utilities/logger');

const axios = require('axios');

const express = require('express');

const app = express();

app.get('/api/main', async (req, res) => {
  logger.info('[BEGIN] /api/main');

  const { data } = await axios.get('http://localhost:3100/api/hello');

  res.status(200).send(data);

  logger.info('[END] /api/main');
});

module.exports = app;
