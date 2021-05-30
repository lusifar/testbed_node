const jwt = require('jsonwebtoken');
const { scrypt, randomBytes } = require('crypto');
const { promisify } = require('util');

const scryptAsync = promisify(scrypt);

const hashPassword = async (password) => {
  const salt = randomBytes(8).toString('hex');
  const buf = await scryptAsync(password, salt, 64);

  return `${buf.toString('hex')}.${salt}`;
};

const comparePassword = async (storedPassword, suppliedPassword) => {
  const [hashedPassword, salt] = storedPassword.split('.');
  const buf = await scryptAsync(suppliedPassword, salt, 64);

  return buf.toString('hex') === hashedPassword;
};

const genToken = (payload, secret) => {
  return jwt.sign(payload, secret, {
    expiresIn: '1d',
  });
};

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

module.exports = {
  hashPassword,
  comparePassword,
  genToken,
  verifyToken,
};
