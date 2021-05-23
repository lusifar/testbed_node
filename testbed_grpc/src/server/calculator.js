const grpc = require('grpc');

const proto = require('../../build/src/proto/calculator_pb');
const service = require('../../build/src/proto/calculator_grpc_pb');

const sum = (call, callback) => {
    const req = call.request;
    
    const res = new proto.SumResponse();
    res.setSumResult(+req.getFirstNumber() + +req.getSecondNumber());

    callback(null, res);
}

const main = () => {
    const server = new grpc.Server();
    server.addService(service.SumServiceService, {sum: sum});

    server.bind('localhost:50051', grpc.ServerCredentials.createInsecure());
    server.start();

    console.log("Server running on port localhost:50051");
}

main();