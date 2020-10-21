const jwt = require('jsonwebtoken');
const UserDB = require('../users/usersModel');
const catchAsync = require('../utils/catchAsync');

const signUpController = catchAsync(async (req, res, next) => {
  const newUser = await UserDB.signup(req);
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

module.exports = {
  signUpController,
};
