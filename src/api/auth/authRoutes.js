const express = require('express');
const {
  signUpController,
  loginController,
  logoutController,
  protect,
} = require('../auth/authController');

const router = express.Router();

router.post('/register', signUpController);
router.post('/login', loginController);
router.post('/logout', protect, logoutController);

module.exports = router;
