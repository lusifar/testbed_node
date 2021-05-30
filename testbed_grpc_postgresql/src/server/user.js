const grpc = require('grpc');

const proto = require('../../build/src/proto/user_pb');
const service = require('../../build/src/proto/user_grpc_pb');

const auth = require('../utility/auth');

const environment = process.env.ENVIRONMENT || 'development';
const config = require('./knexfile')[environment];
const knex = require('knex')(config);

/*
    Implement the register RPC method 
*/
const register = async (call, callback) => {
  console.log('register');

  const req = call.request;
  const user = req.getUser();

  const username = user.getUsername();
  const password = await auth.hashPassword(user.getPassword());
  const email = user.getEmail();

  knex('users')
    .insert({
      username,
      password,
      email,
    })
    .returning(['id', 'username', 'email'])
    .then((data) => {
      if (data.length) {
        const addedUser = new proto.User();
        addedUser.setId(`${data[0].id}`);
        addedUser.setUsername(data[0].username);
        addedUser.setEmail(data[0].email);

        const res = new proto.RegisterResponse();
        res.setUser(addedUser);

        callback(null, res);
      } else {
        return callback({
          code: grpc.status.UNKNOWN,
          message: `Register the user failed`,
        });
      }
    });
};

/*
    Implement the login RPC method
*/
const login = (call, callback) => {
  const req = call.request;

  const username = req.getUsername();
  const password = req.getPassword();

  knex('users')
    .where({ username })
    .returning(['id', 'username', 'password', 'email'])
    .then(async (data) => {
      if (data.length) {
        if (await auth.comparePassword(data[0].password, password)) {
          const user = new proto.User();
          user.setId(`${data[0].id}`);
          user.setUsername(data[0].username);
          user.setEmail(data[0].email);

          const token = auth.genToken(
            {
              id: data[0].id,
              username: data[0].username,
              email: data[0].email,
            },
            process.env.AUTH_SECRET
          );

          const res = new proto.LoginResponse();
          res.setUser(user);
          res.setToken(token);

          callback(null, res);
        } else {
          return callback({
            code: grpc.status.UNAUTHENTICATED,
            message: 'The password is wrong',
          });
        }
      } else {
        return callback({
          code: grpc.status.UNAUTHENTICATED,
          message: 'The username is not existed',
        });
      }
    });
};

module.exports = () => {
  const server = new grpc.Server();

  server.addService(service.UserServiceService, {
    register,
    login,
  });

  server.bind('localhost:50052', grpc.ServerCredentials.createInsecure());
  server.start();

  console.log('User server running on localhost:50052');
};
