const { io } = require('socket.io-client');

class SocketClient {
  constructor(url) {
    this.url = url;

    this.connectListeners = [];
    this.disconnectListeners = [];
    this.reconnectListeners = [];
    this.reconnectAttemptListeners = [];
    this.reconnectFailedListeners = [];
    this.errorListeners = [];

    this.socket = io(url, {
      reconnectionDelayMax: 10000,
    });

    this.socket.on('connect', () => {
      console.log(`soket.io connect: ${this.socket.connected}`);

      this.connectListeners.forEach((listener) => {
        listener();
      });
    });

    this.socket.on('disconnect', () => {
      console.log(`soket.io disconnect: ${this.socket.connected}`);

      this.disconnectListeners.forEach((listener) => {
        listener();
      });
    });

    this.socket.io.on('error', (error) => {
      console.log(`soket.io error: ${error}`);

      this.errorListeners.forEach((listener) => {
        listener(error);
      });
    });

    this.socket.io.on('reconnect', (attempt) => {
      console.log(`soket.io reconnect: ${attempt}`);

      this.reconnectListeners.forEach((listener) => {
        listener(attempt);
      });
    });

    this.socket.io.on('reconnect_attempt', (attempt) => {
      console.log(`soket.io reconnect_attemp: ${attempt}`);

      this.reconnectAttemptListeners.forEach((listener) => {
        listener(attempt);
      });
    });

    this.socket.io.on('reconnect_failed', () => {
      console.log(`soket.io reconnect_failed`);

      this.reconnectFailedListeners.forEach((listener) => {
        listener();
      });
    });
  }

  // add the listener of connect event
  addConnectListener(listener) {
    const index = this.connectListeners.findIndex(listener);
    if (index === -1) {
      this.connectListeners.push(listener);
    }
  }

  // remove the listener of connect event
  removeConnectListener(listener) {
    const index = this.connectListeners.findIndex(listener);
    if (index !== -1) {
      this.connectListeners.splice(index, 1);
    }
  }

  // add the listener of disconnect event
  addDisconnectListener(listener) {
    const index = this.disconnectListeners.findIndex(listener);
    if (index === -1) {
      this.disconnectListeners.push(listener);
    }
  }

  // remove the listener of disconnect event
  removeDisconnectListener(listener) {
    const index = this.disconnectListeners.findIndex(listener);
    if (index !== -1) {
      this.disconnectListeners.splice(index, 1);
    }
  }

  // add the listener of reconnect event
  addReconnectListener(listener) {
    const index = this.reconnectListeners.findIndex(listener);
    if (index === -1) {
      this.reconnectListeners.push(listener);
    }
  }

  // remove the listener of reconnect event
  removeReconnectListener(listener) {
    const index = this.reconnectListeners.findIndex(listener);
    if (index !== -1) {
      this.reconnectListeners.splice(index, 1);
    }
  }

  // add the listener of reconnect attempt event
  addReconnectAttemptListener(listener) {
    const index = this.reconnectAttemptListeners.findIndex(listener);
    if (index === -1) {
      this.reconnectAttemptListeners.push(listener);
    }
  }

  // remove the listener of reconnect attempt event
  removeReconnectAttemptListener(listener) {
    const index = this.reconnectAttemptListeners.findIndex(listener);
    if (index !== -1) {
      this.reconnectAttemptListeners.splice(index, 1);
    }
  } // add the listener of reconnect failed event
  addReconnectFailedListener(listener) {
    const index = this.reconnectFailedListeners.findIndex(listener);
    if (index === -1) {
      this.reconnectFailedListeners.push(listener);
    }
  }

  // remove the listener of reconnect failed event
  removeReconnectFailedListener(listener) {
    const index = this.reconnectFailedListeners.findIndex(listener);
    if (index !== -1) {
      this.reconnectFailedListeners.splice(index, 1);
    }
  }

  // add the listener of error event
  addErrorListener(listener) {
    const index = this.errorListeners.findIndex(listener);
    if (index === -1) {
      this.errorListeners.push(listener);
    }
  }

  // remove the listener of error event
  removeErrorListener(listener) {
    const index = this.errorListeners.findIndex(listener);
    if (index !== -1) {
      this.errorListeners.splice(index, 1);
    }
  }
}

SocketClient.instance = (url) => {
  if (!SocketClient._instance) {
    SocketClient._instance = new SocketClient(url);
  }
  return SocketClient._instance;
};

module.exports = SocketClient;
