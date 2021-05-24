const grpc = require("grpc");

const proto = require("../../build/src/proto/calculator_pb");
const service = require("../../build/src/proto/calculator_grpc_pb");

/*
    Call sum RPC method
*/
const callSum = () => {
  const client = new service.CalculatorServiceClient(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );

  const req = new proto.SumRequest();
  req.setFirstNumber(100);
  req.setSecondNumber(50);

  client.sum(req, (err, res) => {
    if (!err) {
      console.log(`The sum result is: ${res.getSumResult()}`);
    } else {
      console.error(err);
    }
  });
};

/*
    Call primeNumberDecomposition RPC method
*/
const callPrimeNumberDecomposition = () => {
  const client = new service.CalculatorServiceClient(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );

  const number = 567;
  const req = new proto.PrimeNumberDecompositionRequest();
  req.setNumber(number);

  const call = client.primeNumberDecomposition(req, () => {});

  // receive the stream data from server
  call.on("data", (res) => {
    console.log(res.getPrimeFactor());
  });

  call.on("status", (status) => {
    console.log(`the status is ${status.details}`);
  });

  call.on("error", (err) => {
    console.error(err);
  });

  call.on("end", () => {
    console.log("streaming is over");
  });
};

/*
    Call computeAverage RPC method
*/
callComputeAverage = () => {
  const client = new service.CalculatorServiceClient(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );

  // send stream data to the server
  const req = new proto.ComputeAverageRequest();
  req.setNumber(0);

  const call = client.computeAverage(req, (err, res) => {
    if (!err) {
      console.log(`the average number is ${res.getAverage()}`);
    } else {
      console.error(err);
    }
  });

  let count = 0;
  while (++count < 10) {
    console.log(`send number ${count} to server`);

    const req = new proto.ComputeAverageRequest();
    req.setNumber(count);
    call.write(req);
  }
  call.end();
};

/*
    Sleep method
*/
const sleep = async (interval) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), interval);
  });
};

/*
    Call findMaximum RPC method
*/
const callFindMaximum = async () => {
  const client = new service.CalculatorServiceClient(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );

  const call = client.findMaximum(null, (err, res) => {});

  call.on("data", (res) => {
    console.log(`Got new max from server => ${res.getMaximum()}`);
  });

  call.on("error", (err) => {
    console.error(err);
  });

  call.on("end", () => {
    console.log("Server has completed sending data");
  });

  // send stream data to the server
  const numbers = [3, 5, 17, 9, 8, 30, 12];
  for (let number of numbers) {
    console.log(`Sending number: ${number}`);

    const req = new proto.FindMaximumRequest();
    req.setNumber(number);

    call.write(req);

    await sleep(1000);
  }
  call.end();
};

const main = () => {
  // callSum();
  // callPrimeNumberDecomposition();
  // callComputeAverage();
  callFindMaximum();
};

main();
