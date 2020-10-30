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

router
  .route('/')
  .get(protect, getAllUsersController)
  .post(createUserController)
  .patch(protect, updateUserController);
router
  .route('/users/:id')
  .get(protect, getUserByIdController)
  .delete(protect, deleteUserController);
router.route('/current').get(protect, getCurrentUserController);

module.exports = router;
