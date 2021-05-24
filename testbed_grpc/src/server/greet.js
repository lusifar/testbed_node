const grpc = require("grpc");

const proto = require("../../build/src/proto/greet_pb");
const service = require("../../build/src/proto/greet_grpc_pb");

/*
  Implement the greet RPC method
*/
const greet = (call, callback) => {
  const req = call.request;
  const res = new proto.GreetResponse();

  res.setResult(
    `Hello ${req.getGreeting().getFirstName()} ${req
      .getGreeting()
      .getLastName()}`
  );

  callback(null, res);
};

/*
  Implement the greetMany RPC method
*/
const greetMany = (call, callback) => {
  const req = call.request;

  const text = `${req.getGreeting().getFirstName()} ${req
    .getGreeting()
    .getLastName()}`;

  let count = 0;
  while (++count < 10) {
    const res = new proto.GreetManyResponse();
    res.setResult(text);

    call.write(res);
  }
  call.end();
};

/*
  Implement the longGreet RPC method
*/
const longGreet = (call, callback) => {
  call.on("data", (res) => {
    const greeting = res.getGreeting();
    const text = `${greeting.getFirstName()} ${greeting.getLastName()}`;

    console.log(text);
  });

  call.on("status", (status) => {
    console.log(`the status is ${status.details}`);
  });

  call.on("error", (err) => {
    console.error(`the error is ${err}`);
  });

  call.on("end", () => {
    const res = new proto.LongGreetResponse();
    res.setResult("streaming is over");

    callback(null, res);
  });
};

const main = () => {
  const server = new grpc.Server();
  server.addService(service.GreetServiceService, {
    greet,
    greetMany,
    longGreet,
  });

  server.bind("localhost:50051", grpc.ServerCredentials.createInsecure());
  server.start();

  console.log("Server running on port localhost:50051");
};

main();
