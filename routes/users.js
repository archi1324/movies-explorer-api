const router = require('express').Router();
<<<<<<< HEAD
const { getUser, changeUserInfo } = require('../controllers/users');
const { validationChangeUserInfo } = require('../middlewares/validation');

router.get('/me', getUser);
router.patch('/me', validationChangeUserInfo, changeUserInfo);
module.exports = router;
=======
const { getUserInfo, changeUserInfo } = require('../controllers/users');
const { validationChangeUserInfo } = require('../middlewares/validate');

router.get('/me', getUserInfo);
router.patch('/me', validationChangeUserInfo, changeUserInfo);
module.exports = router;
>>>>>>> 1648764e645f33f912589850a0c661571ac1e8e9
