require('dotenv').config();
const sgMail = require('@sendgrid/mail');

function sendEmail(receiver) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: `${receiver}`,
      from: process.env.SENDER,
      subject: 'Welcome to not stackoverflow',
      text: 'ask your qeustions here',
      html: '<strong>ask your qeustions here</strong>',
    };
    console.log('sending email');
    sgMail.send(msg);
}

module.exports = sendEmail;