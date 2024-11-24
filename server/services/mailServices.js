const nodemailer = require("nodemailer");

const sendMail = async (receiverEmailAddress, content, subject) => {
  const userEmail = receiverEmailAddress;

  let config = {
    service: "gmail",
    auth: {
      user: "kingabhaysharma@gmail.com",
      pass: process.env.APP_PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let message = {
    from:"kingabhaysharma@gmail.com",
    to: userEmail,
    subject: subject,
    html: content,
  };

  try {
    await transporter.sendMail(message);
    console.log("Email sent successfully");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = sendMail;


// const nodemailer = require("nodemailer");

// const sendMail = async (receiverEmailAddress, content, subject) => {
//   const userEmail = receiverEmailAddress;

//   // Configure SMTP settings
//   const config = {
//     service: "gmail",
//     auth: {
//       user: process.env.GMAIL_ID, // Your Gmail address
//       pass: process.env.APP_PASSWORD, // App Password
//     },
//   };

//   const transporter = nodemailer.createTransport(config);

//   // Define email message
//   const message = {
//     from: process.env.GMAIL_ID, // Sender email address
//     to: userEmail, // Receiver email address
//     subject: subject, // Subject of the email
//     html: content, // HTML content of the email
//   };

//   try {
//     // Send the email
//     await transporter.sendMail(message);
//     console.log(`Email sent successfully to ${userEmail}`);
//     return true;
//   } catch (error) {
//     // Log error details for debugging
//     console.error("Error while sending email:", error.message);
//     console.error("Stack Trace:", error.stack);

//     // Return a false flag to indicate failure
//     return false;
//   }
// };

module.exports = sendMail;


// const nodemailer = require("nodemailer");

// const sendMail = async (receiverEmailAddress, content, subject) => {
//   // Check if required environment variables are present
//   const userEmail = receiverEmailAddress;
//   const senderEmail = process.env.GMAIL_ID;
//   const appPassword = process.env.APP_PASSWORD;

//   if (!senderEmail || !appPassword) {
//     console.error("Missing environment variables: GMAIL_ID or APP_PASSWORD");
//     return false;
//   }

//   let config = {
//     service: "gmail",
//     auth: {
//       user: senderEmail,
//       pass: appPassword,
//     },
//   };

//   let transporter = nodemailer.createTransport(config);

//   let message = {
//     from: senderEmail,
//     to: userEmail,
//     subject: subject,
//     html: content,
//   };

//   try {
//     const info = await transporter.sendMail(message);
//     console.log("Email sent successfully: " + info.response);
//     return true;
//   } catch (error) {
//     console.error("Error sending email:", error.message);
//     return false;
//   }
// };

// module.exports = sendMail;
