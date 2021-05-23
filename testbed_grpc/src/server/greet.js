const grpc = require("grpc");

const proto = require("../../build/src/proto/greet_pb");
const service = require("../../build/src/proto/greet_grpc_pb");

/*
    Implement the greet RPC method
*/
const greet = (req, callback) => {
  const res = new proto.GreetResponse();

  console.log(req);

  res.setResult(
    `Hello ${req.getGreeting().getFirstName()} ${req
      .getGreeting()
      .getLastName()}`
  );

  callback(null, res);
};

const main = () => {
  const server = new grpc.Server();
  server.addService(service.GreetServiceService, { greet: greet });

  server.bind("localhost:50051", grpc.ServerCredentials.createInsecure());
  server.start();

  console.log("Server running on port localhost:50051");
};

main();
