const express = require('express');

const {
  uploadUserPhoto,
  getAllUsersController,
  getUserByIdController,
  getCurrentUserController,
  createUserController,
  updateUserController,
  deleteUserController,
  updateUserAvatarController,
} = require('./userController');
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
router.route('/users/avatars').patch(protect, updateUserAvatarController);
router.route('/current').get(protect, getCurrentUserController);
router.route('/images').patch(protect, uploadUserPhoto);

module.exports = router;
