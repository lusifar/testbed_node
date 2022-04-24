const { connect, StringCodec, consumerOpts, createInbox } = require('nats');

const main = async () => {
  try {
    // to create a connection to a nats-server:
    const nc = await connect({ servers: 'demo.nats.io:4222' });

    // const jsm = await nc.jetstreamManager();
    // await jsm.streams.add({ name: 'AIC_DEFECTBOT', subjects: ['AIC_DEFECTBOT.*'] });

    // create a StringCodec
    const sc = StringCodec();

    // create a jetstream client:
    const js = nc.jetstream();

    // to publish messages to a stream:
    let pa = await js.publish(
      'AIC_DEFECTBOT.DAILY_MAINTAIN',
      sc.encode(
        JSON.stringify({
          test: '1234',
        })
      )
    );
    // the jetstream returns an acknowledgement with the
    // stream that captured the message, it's assigned sequence
    // and whether the message is a duplicate.
    const stream = pa.stream;
    const seq = pa.seq;
    const duplicate = pa.duplicate;
    console.log(pa);

    const opts = consumerOpts();
    opts.queue("q");
    opts.durable('me');
    opts.manualAck();
    opts.ackExplicit();
    opts.deliverTo(createInbox());

    let sub = await js.subscribe('AIC_DEFECTBOT.DAILY_MAINTAIN', opts);
    const done = (async () => {
      for await (const m of sub) {
        console.log(sc.decode(m.data));

        m.ack();
      }

      sub.destroy();
    })();
  } catch (err) {
    console.log(err);
  }
};

main();
