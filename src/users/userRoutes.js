const express = require('express');
const {
  getAllUsersController,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../users/userController');
const { signUpController, loginController } = require('../auth/authController');
// const { route } = require('../contacts/contactRoutes');

const router = express.Router();

router.post('/register', signUpController);
router.post('/login', loginController);

router.route('/').get(getAllUsersController).post(createUser);

router.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser);

module.exports = router;
