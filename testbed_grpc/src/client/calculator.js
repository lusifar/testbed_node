const grpc = require('grpc');

const proto = require('../../build/src/proto/calculator_pb');
const service = require('../../build/src/proto/calculator_grpc_pb');

const main = () => {
    const client = new service.SumServiceClient(
        "localhost:50051",
        grpc.credentials.createInsecure(),
    );

    const req = new proto.SumRequest();
    req.setFirstNumber(100);
    req.setSecondNumber(50);

    client.sum(req, (err, res) => {
        if(!err) {
            console.log(`The sum result is: ${res.getSumResult()}`);
        } else {
            console.error(err);
        }
    });
}

main();