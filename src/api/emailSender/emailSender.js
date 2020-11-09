const path = require('path');
require('dotenv').config({ path: '.env' });
const sgMail = require('@sendgrid/mail');
const catchAsync = require('../../utils/catchAsync');

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_API_KEY);

const verificationSender = catchAsync(async (email, verificationToken) => {
  const msg = {
    to: email, // Change to your recipient
    from: process.env.SENDGRID_SENSER, // Change to your verified sender
    subject: 'Sendgrid Node.js Homework',
    text: 'HW-06 Verification Sender',
    html: `<p> Please verify your account and follow this <a href='http://localhost:3000/api/v1/auth/verify/${verificationToken}'>link</a>`,
  };

  await sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch(error => {
      console.error(error);
    });
});

module.exports = {
  verificationSender,
};
