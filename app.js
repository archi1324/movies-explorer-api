const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const { validationCreateUser, validationLogin } = require('./middlewares/validation');
const NotFound = require('./errors/NotFound(404)');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { apiLimiter } = require('./middlewares/limiter');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');
const app = express();
app.use(requestLogger);
app.use(cors());
app.use(helmet());
app.use(apiLimiter);
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
app.use(require('./routes/users'));
app.use(require('./routes/movies'));

app.use((req, res, next) => next(new NotFound('Страницы не существует')));
app.use(errorLogger);
app.use(errors());

app.listen(PORT);
