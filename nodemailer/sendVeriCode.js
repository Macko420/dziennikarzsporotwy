const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function codeSend(link, emailAdress) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "host",
    // port: 587,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "email", // generated ethereal user
      pass: "password", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: {
      name: "name",
      address: "email",
    }, // sender address
    to: emailAdress, // list of receivers
    subject: "WITAJ", // Subject line
    text: `Link weryfikacyjny ${link}`, // plain text body
    html: `<p><b>Dziękujemy</b> za założenie konta na dziennikarzsportowy.pl od teraz możesz czytać i uczestniczyć w dyskusjach pod postami. <b> <br/>Dziel sie swoimi spostrzeżeniami </b> <br/> <br/> Kliknij w link w celu weryfikacji konta: ${link}</p>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = { codeSend };
