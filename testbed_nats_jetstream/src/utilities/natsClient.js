const { connect, StringCodec, consumerOpts, credsAuthenticator, AckPolicy } = require('nats');

class NATSClient {
  constructor() {
    this.nc = null;
    this.jsm = null;
    this.js = null;
    this.sc = StringCodec();
    this.subs = {};
    this.handler = null;
  }

  async connect(name, servers, creds = null, apiPrefix = null) {
    try {
      this.nc = await connect({
        name,
        servers,
        ...(creds ? { authenticator: credsAuthenticator(new TextEncoder().encode(creds)) } : {}),
      });

      this.jsm = await this.nc.jetstreamManager({
        ...(apiPrefix ? { apiPrefix } : {}),
      });

      this.js = await this.nc.jetstream({
        ...(apiPrefix ? { apiPrefix } : {}),
      });

      this.handler = setInterval(() => {
        for (let sub of Object.values(this.subs)) {
          sub.pull({ batch: 10, expires: 10000 });
        }
      }, 10000);

      console.log('Successfully connect to NATS');
    } catch (err) {
      console.error(`[NATSClient connect err on ${err.message}]`);
      throw err;
    }
  }

  async disconnect() {
    try {
      // unsubscribe the subscription
      if (this.subs) {
        const subjects = Object.keys(this.subs);
        for (let subject of subjects) {
          await this.unsubscribe(subject);
        }
      }

      // clear the interval with handler
      if (this.handler) {
        clearInterval(this.handler);
      }

      // close the connection
      if (this.nc) {
        const done = this.nc.closed();
        await this.nc.close();

        const err = await done;
        if (err) {
          throw err;
        }
      }

      this.nc = null;
      this.jsm = null;
      this.js = null;
      this.subs = {};
      this.handler = null;
    } catch (err) {
      console.error(`[NATSClient disconnect err on ${err.message}]`);
      throw err;
    }
  }

  isConnected() {
    if (!this.nc) {
      return false;
    }
    return true;
  }

  async addStream(stream, subject) {
    try {
      return this.jsm.streams.add({ name: stream, subjects: [subject] });
    } catch (err) {
      console.log(`[NATSClient addStream err on ${err.message}]`);
      throw err;
    }
  }

  async deleteStream(stream) {
    try {
      return this.jsm.streams.delete(stream);
    } catch (err) {
      console.error(`[NATSClient deleteStream err on ${err.message}]`);
      throw err;
    }
  }

  async addConsumer(stream, subject, consumer) {
    try {
      return this.jsm.consumers.add(stream, {
        durable_name: consumer,
        ack_policy: AckPolicy.Explicit,
        filter_subject: subject,
      });
    } catch (err) {
      console.error(`[NATSClient addConsumer err on ${err.message}]`);
      throw err;
    }
  }

  async deleteConsumer(stream, consumer) {
    try {
      return this.jsm.consumers.delete(stream, consumer);
    } catch (err) {
      console.error(`[NATSClient deleteConsumer err on ${err.message}]`);
      throw err;
    }
  }

  async publish(subject, obj) {
    try {
      const pa = await this.js.publish(subject, this.sc.encode(JSON.stringify(obj)));
      return pa;
    } catch (err) {
      console.log(`[NATSClient publish err on ${err.message}]`);
      throw err;
    }
  }

  async subscribe(stream, subject, consumerName, callback) {
    try {
      if (this.subs[subject]) {
        throw new Error('the subject of the stream is existed');
      }

      if (!callback) {
        throw new Error('the callback is null');
      }

      const opts = consumerOpts();
      opts.manualAck();
      opts.ackExplicit();
      opts.filterSubject(subject);

      if (consumerName) {
        opts.durable(consumerName);
        opts.bind(stream);
      }

      const sub = await this.js.pullSubscribe(subject, opts);
      this.subs[subject] = sub;

      const done = (async () => {
        for await (const m of sub) {
          callback(this.sc.decode(m.data));

          m.ack();
        }
      })();
    } catch (err) {
      console.log(`[NATSClient subscribe err on ${err.message}]`);
      throw err;
    }
  }

  async unsubscribe(subject) {
    try {
      if (!this.subs[subject]) {
        throw new Error('the subject of the stream is not existed');
      }

      await this.subs[subject].unsubscribe();
      await this.subs[subject].destroy();

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
