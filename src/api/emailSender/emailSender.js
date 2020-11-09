const path = require('path');
require('dotenv').config({ path: '.env' });
const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_API_KEY);

const verificationSender = async (email, verificationToken) => {
  try {
    const msg = {
      to: email, // Change to your recipient
      from: process.env.SENDGRID_SENDER, // Change to your verified sender
      subject: 'Sendgrid Node.js Homework',
      text: 'HW-06 Verification Sender',
      html: `<p> Please verify your account and follow this <a href='http://localhost:3000/api/v1/auth/verify/${verificationToken}'>link</a>`,
    };
    await sgMail.send(msg);
  } catch (error) {
    console.error('error', error);

    if (error.response) {
      throw new Error(error.response.body);
    }
  }
};

module.exports = {
  verificationSender,
};
