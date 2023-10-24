const router = require('express').Router();
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFound = require('../errors/NotFound(404)');
const { createUser, login } = require('../controllers/users');
const { validationCreateUser, validationLogin } = require('../middlewares/validation');

router.post('/signin', validationLogin, login);
router.post('/signup', validationCreateUser, createUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use('*', () => {
  throw new NotFound('Страница не найдена');
});

module.exports = router;