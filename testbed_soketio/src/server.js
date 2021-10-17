const { Server } = require('socket.io');

const io = new Server(3030, {
  /* options */
});

io.on('connection', (socket) => {
  console.log(`connection: ${socket}`);
});
