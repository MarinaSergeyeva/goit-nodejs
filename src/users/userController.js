const AppError = require('../errors/appError');
const User = require('../users/usersModel');
const catchAsync = require('../utils/catchAsync');

const getAllUsersController = catchAsync(async (req, res, next) => {
  let users;
  let options = {
    page: req.query.page,
    limit: req.query.limit,
    pagination: true,
  };
  if (req.query.sub) {
    options = {
      pagination: false,
    };
    users = await (await User.getAllUsers(options)).filter(user => {
      if (user.subscription === req.query.sub) {
        return user;
      }
    });
  } else users = await User.getAllUsers(options);

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
});

const createUserController = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
});

const updateUserController = catchAsync(async (req, res, next) => {
  const id = req.user._id;
  const user = await User.updateUserInfo(id);

  if (!user) {
    return next(new AppError(`No contact found with that ID`, 404));
  }

  const updatedUser = await User.updateUserInfo(id, req.body);

  res.json({
    status: 'success',
    message: 'Subscription changed successfully!',
    user: updatedUser,
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
