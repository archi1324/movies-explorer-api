const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
<<<<<<< HEAD
const { validationCreateMovie, validationDeleteMovie } = require('../middlewares/validation');
=======
const { validationCreateMovie, validationDeleteMovie } = require('../middlewares/validate');
>>>>>>> 1648764e645f33f912589850a0c661571ac1e8e9

router.get('/', getMovies);
router.post('/', validationCreateMovie, createMovie);
router.delete('/:id', validationDeleteMovie, deleteMovie);
<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 1648764e645f33f912589850a0c661571ac1e8e9
