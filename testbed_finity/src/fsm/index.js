const Finity = require('finity');

const config = Finity.configure()
  .initialState('ready')
  .on('task_submmited')
  .transitionTo('running')
  .state('running')
  .onEnter((state, context) => {
    console.log(`processing the task from state: ${state}`);
  })
  .onExit((state, context) => {
    console.log(`all done! from state: ${state}`);
  })
  .getConfig();

module.exports = config;
