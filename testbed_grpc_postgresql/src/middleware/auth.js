const grpc = require('grpc');
const decode = require('jsonwebtoken/decode');

const auth = require('../utility/auth');

const verifyAuthentication = async (ctx, next, errorCb) => {
  const metadata = ctx.call.metadata;
  const bearerToken = metadata.get('authorization')[0];

  // check exists
  if (!bearerToken) {
    errorCb({
      code: grpc.status.DATA_LOSS,
      message: 'The accessToken is not existed',
    });
  }

  // check brear prefix
  const [prefix, token] = bearerToken.split(' ');
  if (prefix !== 'bearer') {
    errorCb({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'The accessToken is not bearer',
    });
  }

  // verify the jwt token
  try {
    const decode = auth.verifyToken(token, process.env.AUTH_SECRET);

    const user = {
      id: decode.id,
      username: decode.username,
      email: decode.email,
    };

    metadata.set('user', JSON.stringify(user));

    await next();
  } catch (err) {
    console.log(err);

    errorCb({
      code: grpc.status.UNAUTHENTICATED,
      message: 'Authentication failed',
    });
  }
};

module.exports = {
  verifyAuthentication,
};
