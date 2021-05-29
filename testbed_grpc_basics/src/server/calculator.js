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

    console.log(`Receive number ${number}`);

    total += number;
    count += 1;
  });

  call.on("status", (status) => {
    console.log(`The status is ${status.details}`);
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

/*
    Implement the findMaximun RPC method
*/
const findMaximum = async (call, callback) => {
  let currentMaximum = 0;
  let currentNumber = 0;

  // receive the stream data from client
  call.on("data", (req) => {
    currentNumber = req.getNumber();
    console.log(`Streaming data is ${currentNumber}`);

    if (currentNumber > currentMaximum) {
      currentMaximum = currentNumber;

      const res = new proto.FindMaximumResponse();
      res.setMaximum(currentMaximum);

      call.write(res);
    }
  });

  call.on("error", (err) => {
    console.log(err);
  });

  call.on("end", () => {
    const res = new proto.FindMaximumResponse();
    res.setMaximum(currentMaximum);

    call.write(res);
    call.end();

    console.log("Streaming data from client is end");
  });
};

const main = () => {
  const server = new grpc.Server();
  server.addService(service.CalculatorServiceService, {
    sum,
    primeNumberDecomposition,
    computeAverage,
    findMaximum,
  });

  server.bind("localhost:50051", grpc.ServerCredentials.createInsecure());
  server.start();

  console.log("Server running on port localhost:50051");
};

main();
