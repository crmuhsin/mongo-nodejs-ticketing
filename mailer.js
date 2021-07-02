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
let text = `Dear Valued Cardmember,


Thank you for using LankaBangla VISA Credit Card.

Enclosed, please find your last month Credit Card account statement.
The file is password protected. Please use the last four (4) digit of your credit card number (without any space or special character) as password to open the enclosed file.

If you have any query, please call 16325 or 09611016325 from overseas or email to myrequest@lankabangla.com

For more information of our products and services, please visit our website: www.lankabangla.com

Stay Safe!

Best regards,
LankaBangla Cards Team

This is an auto-generated e-mail and please do not reply to this.`;

module.exports = {
  sendMail(params, filePath) {
    const mailOptions = {
      from: myEmail,
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
