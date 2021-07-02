const nodemailer = require("nodemailer");

// use your mail address and password
// and enable less secureapps
// https://myaccount.google.com/lesssecureapps

let myEmail ="";
let myPass ="";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: myEmail,
    pass: myPass,
  },
});

let subject = "Exclusive Travels Ticket";
let text = `Dear Valued Customer,


Thank you for booking and completing payment.

Attatche, please find your ticket.
The file has all relevant booking information.

If you have any query, please call or email to myrequest@exclusivetravels.com

For more information, please visit our website: www.exclusivetravels.com

Stay Safe!

Best regards,
Exclusive Travels

This is an auto-generated e-mail and please do not reply to this.`;

module.exports = {
  sendMail(params, filePath) {
    const mailOptions = {
      from: "no-reply@exclusivetravels.com",
      to: params.to,
      subject,
      text,
      attachments: [
        {
          filename: "ticket.pdf",
          path: `${__dirname}/${filePath}`,
        },
      ],
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
};
