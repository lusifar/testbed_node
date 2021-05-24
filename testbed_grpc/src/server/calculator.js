const grpc = require("grpc");

const proto = require("../../build/src/proto/calculator_pb");
const service = require("../../build/src/proto/calculator_grpc_pb");

/*
    Implement the sum RPC method
*/
const sum = (call, callback) => {
  const req = call.request;

  const res = new proto.SumResponse();
  res.setSumResult(+req.getFirstNumber() + +req.getSecondNumber());

  callback(null, res);
};

/*
    Implement the primeNumberDecomposition RPC method
*/
const primeNumberDecomposition = (call, callback) => {
  let number = call.request.getNumber();
  let divisor = 2;

  while (number > 1) {
    if (number % divisor === 0) {
      const res = new proto.PrimeNumberDecompositionResponse();
      res.setPrimeFactor(divisor);

      number = number / divisor;

      call.write(res);
    } else {
      divisor += 1;
      console.log(`Divisor has increased to ${divisor}`);
    }
  }
  call.end();
};

/*
    Implement the computeAverage RPC method
*/
const computeAverage = (call, callback) => {
  let total = 0;
  let count = 0;

  // receive the stream data from client
  call.on("data", (req) => {
    const number = req.getNumber();

    console.log(`receive number ${number}`);

    total += number;
    count += 1;
  });

  call.on("status", (status) => {
    console.log(`the status is ${status.details}`);
  });

  call.on("error", (err) => {
    console.error(err.details);
  });

  call.on("end", () => {
    const avg = total / count;

    const res = new proto.ComputeAverageResponse();
    res.setAverage(avg);

    callback(null, res);
  });
};

const main = () => {
  const server = new grpc.Server();
  server.addService(service.CalculatorServiceService, {
    sum,
    primeNumberDecomposition,
    computeAverage,
  });

  server.bind("localhost:50051", grpc.ServerCredentials.createInsecure());
  server.start();

  console.log("Server running on port localhost:50051");
};

main();
