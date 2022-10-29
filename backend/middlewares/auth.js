const jwt = require('jsonwebtoken');
const AuthorizedError = require('../errors/AuthorizedError');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET_KEY : 'dev-secret');
  } catch (err) {
    throw new AuthorizedError('Необходима авторизация');
  }

  req.user = payload;
  next();
};
