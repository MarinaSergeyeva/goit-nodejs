const express = require('express');
const {
  getAllUsersController,
  getUserByIdController,
  getCurrentUserController,
  createUserController,
  updateUserController,
  deleteUserController,
} = require('../users/userController');
const { protect } = require('../auth/authController');

const router = express.Router();

router.route('/').get(getAllUsersController).post(createUserController);
router
  .route('/users/:id')
  .get(getUserByIdController)
  .patch(updateUserController)
  .delete(deleteUserController);
router.route('/current').get(protect, getCurrentUserController);

module.exports = router;
