const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const AuthorizedError = require('../errors/AuthorizedError');
const ConflictError = require('../errors/ConflictError');
const { NODE_ENV, JWT_SECRET_KEY } = process.env;

const getUsers = (req, res, next) => User.find({})
  .then((users) => res.send({ data: users }))
  .catch((err) => { next(err); });

const getUser = (req, res, next) => User.findById(req.user._id)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    res.send({ data: user });
  })
  .catch((err) => { next(err); });

const findById = (req, res, next) => User.findById(req.params.userId)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователя с таким id нет');
    }
    return res.send({ data: user });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Некорректные данные'));
    } else {
      next(err);
    }
  });

const createUser = (req, res, next) => {
  console.log('BACK')
  console.log(req.body)
  const {
    email: userEmail, name: userName, about: userAbout, avatar: userAvatar, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      console.log('BACK', userEmail)
      User.create({
        name: userName, about: userAbout, avatar: userAvatar, email: userEmail, password: hash,
      })
        .then(({
          name, about, _id, avatar, email, createdAt,
        }) => {
          res.send({
            name, about, _id, avatar, email, createdAt,
          });
        }).catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError('Пользователь с таким email уже существует'));
          }
          if (err.name === 'ValidationError') {
            next(new BadRequestError('Некорректные данные'));
          } else {
            next(err);
          }
        });
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET_KEY : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => {
      next(new AuthorizedError('Необходима авторизация'));
    });
};

module.exports = {
  getUsers, getUser, findById, createUser, updateUser, updateAvatar, login,
};
