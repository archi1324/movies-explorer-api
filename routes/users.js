const router = require('express').Router();
const { getUser, changeUserInfo } = require('../controllers/users');
const { validationChangeUserInfo } = require('../middlewares/validation');

router.get('/me', getUser);
router.patch('/me', validationChangeUserInfo, changeUserInfo);
module.exports = router;
