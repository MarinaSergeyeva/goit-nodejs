const express = require('express');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../users/userController');
const { signUpController } = require('../auth/authController');
const { route } = require('../contacts/contactRoutes');

const router = express.Router();

router.post('/register', signUpController);

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser);

module.exports = router;
