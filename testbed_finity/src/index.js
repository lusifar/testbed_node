const Finity = require('finity');
const fsm = require('./fsm');

const run = async () => {
  const stateMachine = Finity.start(fsm);

  stateMachine.handle('task_submmited');
};

run();
