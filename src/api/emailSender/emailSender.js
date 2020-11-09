const path = require('path');
require('dotenv').config({ path: '.env' });
const sgMail = require('@sendgrid/mail');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../errors/appError');

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendMessage = catchAsync(async msg => {
  const email = await sgMail.send(msg);

  if (!email) {
    return next(new AppError('Not Found'), 404);
  }
});

const verificationSender = catchAsync(async (email, verificationToken) => {
  const msg = {
    to: email, // Change to your recipient
    from: process.env.SENDGRID_SENDER, // Change to your verified sender
    subject: 'Sendgrid Node.js Homework',
    text: 'HW-06 Verification Sender',
    html: `<p> Please verify your account and follow this <a href='http://localhost:3000/api/v1/auth/verify/${verificationToken}'>link</a>`,
  };

  sendMessage(msg);
});

module.exports = {
  verificationSender,
};
