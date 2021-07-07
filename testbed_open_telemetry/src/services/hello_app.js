const opentelemetry = require('@opentelemetry/api');
const { ResourceAttributes } = require('@opentelemetry/semantic-conventions');

const { NodeTracerProvider } = require('@opentelemetry/node');
const { ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');

const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { WinstonInstrumentation } = require('@opentelemetry/instrumentation-winston');

// setup the OpenTelemetry for console and jaeger
const provider = new NodeTracerProvider({
  resource: {
    attributes: {
      [ResourceAttributes.SERVICE_NAME]: 'hello_app',
    },
  },
});

const consoleExporter = new ConsoleSpanExporter();
const consoleSpanProcessor = new SimpleSpanProcessor(consoleExporter);

const jaegerExporter = new JaegerExporter({
  tags: [
    {
      key: 'service.name',
      value: 'hello_app',
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
    new WinstonInstrumentation({
      logHook: (record, span) => {
        record['resource.service.name'] = provider.resource.attributes['service.name'];
      },
    }),
  ],
});

const logger = require('../utilities/logger');

const express = require('express');

const app = express();

app.get('/api/hello', async (req, res) => {
  logger.info('[BEGIN] /api/hello');

  res.status(200).send({
    hello: 'world',
  });

  logger.info('[END] /api/hello');
});

module.exports = app;
