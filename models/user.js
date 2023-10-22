const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
<<<<<<< HEAD
const Unauthorized = require('../errors/Unauthorized(401)');
=======
const Unauthorized = require('../errors/Unauthorized (401)');
>>>>>>> 1648764e645f33f912589850a0c661571ac1e8e9

const User = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Неверный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
<<<<<<< HEAD
});

User.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new Unauthorized('Ошибка авторизации'),
        );
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(
              new Unauthorized('Ошибка авторизации'),
            );
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', User);
=======
});
>>>>>>> 1648764e645f33f912589850a0c661571ac1e8e9
