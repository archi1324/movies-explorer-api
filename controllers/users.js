require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFound = require('../errors/NotFound(404)');
const Conflict = require('../errors/Conflict(409)');
const BadRequest = require('../errors/BadRequest(400)');
const Unauthorized = require('../errors/Unauthorized(401)');

const { NODE_ENV, JWT_SECRET } = require('../utils/dotenv');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь по указанному _id не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Данные переданы неверно'));
      } else {
        next(err);
      }
    });
};

module.exports.changeUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь с указанным _id не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict('Пользователь уже зарегистрирован'));
      }
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequest('Данные переданы неверно'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10).then((hash) => User.create({
    email, password: hash, name,
  }))
    .then((user) => {
      const { _id } = user;
      return res.status(201).send({
        email, name, _id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict('Пользователь уже зарегистрирован'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequest('Данные переданы неверно'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then(({ _id }) => {
      if (_id) {
        const token = jwt.sign({ _id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
        return res.send({ token });
      }
      throw new Unauthorized('Неправильные почта или пароль');
    })
    .catch(next);
};
