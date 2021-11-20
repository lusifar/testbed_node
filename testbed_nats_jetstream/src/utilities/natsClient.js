const { connect, StringCodec, consumerOpts, createInbox } = require('nats');

class NATSClient {
  constructor() {
    this.nc = null;
    this.jsm = null;
    this.js = null;
    this.sc = StringCodec();
    this.subs = {};
  }

  async connect(url, port) {
    try {
      this.nc = await connect({ servers: `${url}:${port}` });
      this.jsm = await this.nc.jetstreamManager();
      this.js = await this.nc.jetstream();
    } catch (err) {
      console.log(`[NATSClient connect err on ${err.message}]`);
      throw err;
    }
  }

  async disconnect() {
    try {
      // unsubscribe the subscription
      const keys = Object.keys(this.subs);
      for (let key of keys) {
        const [stream, subject] = key.split('.');
        await this.unsubscribe(stream, subject);
      }

      // close the connection
      const done = this.nc.closed();
      await this.nc.close();

      const err = await done;
      if (err) {
        throw err;
      }

      this.nc = null;
      this.jsm = null;
      this.js = null;
      this.subs = {};
    } catch (err) {
      console.log(`[NATSClient disconnect err on ${err.message}]`);
      throw err;
    }
  }

  isConnected() {
    if (!this.nc) {
      return false;
    }
    return true;
  }

  async addStream(stream) {
    try {
      await this.jsm.streams.add({ name: stream, subjects: [`${stream}.*`] });
    } catch (err) {
      console.log(`[NATSClient addStream err on ${err.message}]`);
      throw err;
    }
  }

  async publish(stream, subject, obj) {
    try {
      const pa = await this.js.publish(`${stream}.${subject}`, this.sc.encode(JSON.stringify(obj)));
      return pa;
    } catch (err) {
      console.log(`[NATSClient publish err on ${err.message}]`);
      throw err;
    }
  }

  async subscribe(stream, subject, callback) {
    try {
      const ss = `${stream}.${subject}`;

      if (this.subs[ss]) {
        throw new Error('the subject of the stream is existed');
      }

      if (!callback) {
        throw new Error('the callback is null');
      }

      const opts = consumerOpts();
      opts.durable('NATSClient_Durable');
      opts.manualAck();
      opts.ackExplicit();
      opts.deliverTo(createInbox());

      const sub = await this.js.subscribe(ss, opts);
      this.subs[ss] = sub;

      const done = (async () => {
        for await (const m of sub) {
          callback(JSON.parse(this.sc.decode(m.data)));

          m.ack();
        }
      })();
    } catch (err) {
      console.log(`[NATSClient subscribe err on ${err.message}]`);
      throw err;
    }
  }

  async unsubscribe(stream, subject) {
    try {
      const ss = `${stream}.${subject}`;

      if (!this.subs[ss]) {
        throw new Error('the subject of the stream is not existed');
      }

      await this.subs[ss].unsubscribe();
      await this.subs[ss].destroy();

      delete this.subs[ss];
    } catch (err) {
      console.log(`[NATSClient unsubscribe err on ${err.message}]`);
      throw err;
    }
  }
}

NATSClient._instance = null;
NATSClient.instance = () => {
  if (!NATSClient._instance) {
    NATSClient._instance = new NATSClient();
  }
  return NATSClient._instance;
};

module.exports = NATSClient;
