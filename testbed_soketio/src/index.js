const SocketClient = require('./utilities/socketClient');

const socketClient = SocketClient.instance('ws://127.0.0.1:3030');

socketClient.addConnectListener(() => {
  console.log('connectListener');
});

socketClient.addDisconnectListener(() => {
  console.log('disconnectListener');
});

socketClient.addReconnectListener((attempt) => {
  console.log(`reconnectListener: ${attempt}`);
});

socketClient.addReconnectAttemptListener((attempt) => {
  console.log(`reconnectAttemptListener: ${attempt}`);
});

socketClient.addReconnectFailedListener(() => {
  console.log(`reconnectFailedListener`);
});

socketClient.addErrorListener((error) => {
  console.log(`errorListener: ${error}`);
});
