const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequest(400)');
const Forbidden = require('../errors/Forbidden(403)');
const NotFound = require('../errors/NotFound(404)');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
        if (movies) return res.send(movies);
        throw new NotFound('Карточка не найдена');
    })
    .catch((err) => {
        if (err.name === 'CastError') {
          next(new BadRequest('Данные переданы неверно'));
        } else {
          next(err);
        }
      });
};

module.exports.createMovie = (req, res, next) => {
  Movie.create({ owner: req.user._id, ...req.body })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при создании фильма'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        throw new Forbidden('Доступ запрещен');
      }
      Movie.findByIdAndDelete(movieId)
      .then(() => res.send({ message: 'Фильм успешно удален' }))
      .catch(next);
  })
  .catch(next);
};