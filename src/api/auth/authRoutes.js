const express = require('express');
const {
  signUpController,
  loginController,
  logoutController,
  protect,
  verifyUser,
} = require('../auth/authController');
const { getUserByTokenController } = require('../users/userController');

const router = express.Router();

router.post('/register', signUpController);
router.post('/login', loginController);
router.post('/logout', protect, logoutController);
router.get('/verify/:verificationToken', verifyUser);

module.exports = router;
