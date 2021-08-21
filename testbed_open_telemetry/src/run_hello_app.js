const hello_app = require('./services/hello_app');

hello_app.listen(3100, () => {
  console.log('hello_app is running on port 3100');
});
