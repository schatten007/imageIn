const nodemailer = require('nodemailer');

const sendVerificationEmail = (to, token) => {

    // Change Transporter after testing
    
    var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "f89c2d0c63ca3a",
          pass: "0b9dc6b2d4335c"
        }
    });
    
    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       user: process.env.EMAIL_USERNAME,
    //       pass: process.env.EMAIL_PASSWORD
    //     }
    //   });
    
    // ADD PROPER URL WHEN DEPLOYING!

    const mailOptions = {
        from: "ImageIn Dev",
        to,
        subject: 'Verify your email address',
        html: `<!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Email Verification</title>
        </head>
        <body>
          <h2>Email Verification</h2>
          <p>Please click on the following link to verify your email address:</p>
          <p><a href="http://127.0.0.1:8042/user/verify-email/${token}">Verify Email Address</a></p>
          <p>If you did not request this verification, please ignore this email.</p>
          <p>Thank you for using our service!</p>
        </body>
        </html>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = sendVerificationEmail;