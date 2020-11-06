const path = require('path');
require('dotenv').config({ path: '.env' });
const sgMail = require('@sendgrid/mail');

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_API_KEY);

const msg = {
  to: 'morrrinad@gmail.com', // Change to your recipient
  from: 'morrrinad@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  //   html: '<a href='http://localhost:3000/api/auth/verify/${verificationToken}'>link</a>
',
};
sgMail
  .send(msg)
  .then(res => {
    console.log(res);
  })
  .catch(error => {
    console.error(error);
  });
