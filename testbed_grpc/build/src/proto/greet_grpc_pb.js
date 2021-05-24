// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var src_proto_greet_pb = require('../../src/proto/greet_pb.js');

function serialize_greet_GreetEveryoneRequest(arg) {
  if (!(arg instanceof src_proto_greet_pb.GreetEveryoneRequest)) {
    throw new Error('Expected argument of type greet.GreetEveryoneRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_greet_GreetEveryoneRequest(buffer_arg) {
  return src_proto_greet_pb.GreetEveryoneRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_greet_GreetEveryoneResponse(arg) {
  if (!(arg instanceof src_proto_greet_pb.GreetEveryoneResponse)) {
    throw new Error('Expected argument of type greet.GreetEveryoneResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_greet_GreetEveryoneResponse(buffer_arg) {
  return src_proto_greet_pb.GreetEveryoneResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_greet_GreetManyRequest(arg) {
  if (!(arg instanceof src_proto_greet_pb.GreetManyRequest)) {
    throw new Error('Expected argument of type greet.GreetManyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_greet_GreetManyRequest(buffer_arg) {
  return src_proto_greet_pb.GreetManyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_greet_GreetManyResponse(arg) {
  if (!(arg instanceof src_proto_greet_pb.GreetManyResponse)) {
    throw new Error('Expected argument of type greet.GreetManyResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_greet_GreetManyResponse(buffer_arg) {
  return src_proto_greet_pb.GreetManyResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_greet_GreetRequest(arg) {
  if (!(arg instanceof src_proto_greet_pb.GreetRequest)) {
    throw new Error('Expected argument of type greet.GreetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_greet_GreetRequest(buffer_arg) {
  return src_proto_greet_pb.GreetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_greet_GreetResponse(arg) {
  if (!(arg instanceof src_proto_greet_pb.GreetResponse)) {
    throw new Error('Expected argument of type greet.GreetResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_greet_GreetResponse(buffer_arg) {
  return src_proto_greet_pb.GreetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_greet_LongGreetRequest(arg) {
  if (!(arg instanceof src_proto_greet_pb.LongGreetRequest)) {
    throw new Error('Expected argument of type greet.LongGreetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_greet_LongGreetRequest(buffer_arg) {
  return src_proto_greet_pb.LongGreetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_greet_LongGreetResponse(arg) {
  if (!(arg instanceof src_proto_greet_pb.LongGreetResponse)) {
    throw new Error('Expected argument of type greet.LongGreetResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_greet_LongGreetResponse(buffer_arg) {
  return src_proto_greet_pb.LongGreetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var GreetServiceService = exports.GreetServiceService = {
  // unary api
greet: {
    path: '/greet.GreetService/Greet',
    requestStream: false,
    responseStream: false,
    requestType: src_proto_greet_pb.GreetRequest,
    responseType: src_proto_greet_pb.GreetResponse,
    requestSerialize: serialize_greet_GreetRequest,
    requestDeserialize: deserialize_greet_GreetRequest,
    responseSerialize: serialize_greet_GreetResponse,
    responseDeserialize: deserialize_greet_GreetResponse,
  },
  // server stream api
greetMany: {
    path: '/greet.GreetService/GreetMany',
    requestStream: false,
    responseStream: true,
    requestType: src_proto_greet_pb.GreetManyRequest,
    responseType: src_proto_greet_pb.GreetManyResponse,
    requestSerialize: serialize_greet_GreetManyRequest,
    requestDeserialize: deserialize_greet_GreetManyRequest,
    responseSerialize: serialize_greet_GreetManyResponse,
    responseDeserialize: deserialize_greet_GreetManyResponse,
  },
  // client stream api
longGreet: {
    path: '/greet.GreetService/LongGreet',
    requestStream: true,
    responseStream: false,
    requestType: src_proto_greet_pb.LongGreetRequest,
    responseType: src_proto_greet_pb.LongGreetResponse,
    requestSerialize: serialize_greet_LongGreetRequest,
    requestDeserialize: deserialize_greet_LongGreetRequest,
    responseSerialize: serialize_greet_LongGreetResponse,
    responseDeserialize: deserialize_greet_LongGreetResponse,
  },
  // bidirection stream api
greetEveryone: {
    path: '/greet.GreetService/GreetEveryone',
    requestStream: true,
    responseStream: true,
    requestType: src_proto_greet_pb.GreetEveryoneRequest,
    responseType: src_proto_greet_pb.GreetEveryoneResponse,
    requestSerialize: serialize_greet_GreetEveryoneRequest,
    requestDeserialize: deserialize_greet_GreetEveryoneRequest,
    responseSerialize: serialize_greet_GreetEveryoneResponse,
    responseDeserialize: deserialize_greet_GreetEveryoneResponse,
  },
};

exports.GreetServiceClient = grpc.makeGenericClientConstructor(GreetServiceService);
