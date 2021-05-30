const grpc = require('grpc');

const proto = require('../../build/src/proto/user_pb');
const service = require('../../build/src/proto/user_grpc_pb');

/*
    Call the register RPC method
*/
callRegister = () => {
  const client = new service.UserServiceClient('localhost:50052', grpc.credentials.createInsecure());

  const user = new proto.User();
  user.setUsername('rickychao');
  user.setPassword('168Lusifar');
  user.setEmail('rickychao@gmail.com');

  const req = new proto.RegisterRequest();
  req.setUser(user);

  client.register(req, (err, res) => {
    if (!err) {
      const addedUser = res.getUser();
      console.log(`(id: ${addedUser.getId()}, username: ${addedUser.getUsername()}, email: ${addedUser.getEmail()})`);
    } else {
      console.error(err);
    }
  });
};

/*
    Call the login RPC method
*/
callLogin = () => {
  const client = new service.UserServiceClient('localhost:50052', grpc.credentials.createInsecure());

  const req = new proto.LoginRequest();
  req.setUsername('rickychao');
  req.setPassword('168Lusifar');

  client.login(req, (err, res) => {
    if (!err) {
      const user = res.getUser();
      const token = res.getToken();
      console.log(`(id: ${user.getId()}, username: ${user.getUsername()}, email: ${user.getEmail()}, token: ${token})`);
    } else {
      console.error(err);
    }
  });
};

const main = () => {
  //callRegister();
  callLogin();
};

main();
