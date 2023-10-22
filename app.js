const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
<<<<<<< HEAD
const { errors } = require('celebrate');
=======
const { celebrate, Joi, errors } = require('celebrate');
>>>>>>> 1648764e645f33f912589850a0c661571ac1e8e9
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const { validationCreateUser, validationLogin } = require('./middlewares/validation');
const NotFound = require('./errors/NotFound(404)');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');
const app = express();
app.use(requestLogger);
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);
app.use(auth);
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);

<<<<<<< HEAD
=======


>>>>>>> 1648764e645f33f912589850a0c661571ac1e8e9
app.use((req, res, next) => next(new NotFound('Страницы не существует')));
app.use(errorLogger);
app.use(errors());

<<<<<<< HEAD
app.listen(PORT);
=======
app.listen(PORT);
>>>>>>> 1648764e645f33f912589850a0c661571ac1e8e9
