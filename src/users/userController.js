const User = require('../users/usersModel');
const catchAsync = require('../utils/catchAsync');

const getAllUsersController = catchAsync(async (req, res, next) => {
  const users = await User.getAllUsers();
  res.json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

const getUserByIdController = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
});

const getCurrentUserController = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const user = await User.getUserById(id);

  if (!user) {
    return next(new AppError(`No user found with that ID`, 404));
  }

  res.json({
    status: 'success',
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });

  // res.status(500).json({
  //   status: 'error',
  //   message: 'This route is not yet defined!',
  // });
});

const createUserController = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
});

const updateUserController = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
});

const deleteUserController = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
});

module.exports = {
  getAllUsersController,
  getUserByIdController,
  getCurrentUserController,
  createUserController,
  updateUserController,
  deleteUserController,
};
