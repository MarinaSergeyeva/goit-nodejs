const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../users/usersModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../errors/appError');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

const signUpController = catchAsync(async (req, res, next) => {
  const newUser = await User.signup(req.body);

  createSendToken(newUser, 201, res);
});

const loginController = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const user = await User.login({ email });

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // const token = signToken(user._id);
  createSendToken(user, res.statusCode, res);

  // res.json({
  //   status: 'success',
  //   token,
  //   user: {
  //     email: user.email,
  //     subscription: user.subscription,
  //   },
  // });
});

const logoutController = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(204).json({
    status: 'No content',
  });
};

const protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401),
    );
  }
  console.log('token in authController', token);
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.getUserById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to the token does no longer exist.',
        401,
      ),
    );
  }

  if (currentUser.changePasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401),
    );
  }

  req.user = currentUser;
  next();
});

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }

    next();
  };
};

const getCurrentUserController = catchAsync(async (req, res, next) => {
  const user = await User.getUserById(req.user._id);
  next();
});

module.exports = {
  signUpController,
  loginController,
  logoutController,
  getCurrentUserController,
  protect,
  restrictTo,
};
