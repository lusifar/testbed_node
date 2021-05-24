const grpc = require("grpc");

const proto = require("../../build/src/proto/greet_pb");
const service = require("../../build/src/proto/greet_grpc_pb");

/*
  Call the greet RPC method
*/
const callGreet = () => {
  const client = new service.GreetServiceClient(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );

  // create the greeting object
  const greeting = new proto.Greeting();
  greeting.setFirstName("Ricky");
  greeting.setLastName("Chao");

  // create the request and setup payload
  const req = new proto.GreetRequest();
  req.setGreeting(greeting);

  // make the request
  client.greet(req, (err, res) => {
    if (!err) {
      console.log(`Greeting response: ${res.getResult()}`);
    } else {
      console.error(err);
    }
  });
};

/*
  Call the greetMany RPC method
*/
const callGreetMany = () => {
  const client = new service.GreetServiceClient(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );

  const greeting = new proto.Greeting();
  greeting.setFirstName("ricky");
  greeting.setLastName("chao");

  const req = new proto.GreetManyRequest();
  req.setGreeting(greeting);

  const call = client.greetMany(req, () => {});

  call.on("data", (res) => {
    console.log(res.getResult());
  });

  call.on("status", (res) => {
    console.log(`the status is ${res.details}`);
  });

  call.on("error", (err) => {
    console.error(`the error is ${err.details}`);
  });

  call.on("end", () => {
    console.log("streaming is over");
  });
};

/*
  Call the longGreet RPC method
*/
const callLongGreet = () => {
  const client = new service.GreetServiceClient(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );

  const greeting = new proto.Greeting();
  greeting.setFirstName("ricky");
  greeting.setLastName("chao");

  const req = new proto.LongGreetRequest();
  req.setGreeting(greeting);

  const call = client.longGreet(req, (err, res) => {
    if (!err) {
      console.log(res.getResult());
    } else {
      console.error(err);
    }
  });

  let count = 0;
  while (++count < 10) {
    call.write(req);
  }
  call.end();
};

const main = () => {
  // callGreet();
  // callGreetMany();
  callLongGreet();
};

main();
