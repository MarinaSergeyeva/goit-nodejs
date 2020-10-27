const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../users/usersModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../errors/appError');

const signToken = id => {
  console.log('object', process.env.JWT_EXPIRES_IN);
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signUpController = catchAsync(async (req, res, next) => {
  const newUser = await User.signup(req.body);
  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
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

  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

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

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const freshUser = await User.getUserById(decoded.id);

  if (!freshUser) {
    return next(
      new AppError(
        'The user belonging to the token does no longer exist.',
        401,
      ),
    );
  }
  next();
});

module.exports = {
  signUpController,
  loginController,
  protect,
};
