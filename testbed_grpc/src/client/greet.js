const grpc = require("grpc");

const proto = require("../../build/src/proto/greet_pb");
const service = require("../../build/src/proto/greet_grpc_pb");

const main = () => {
  console.log("Hello from client");

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

main();
