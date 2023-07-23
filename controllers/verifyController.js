const db = require("../database/models");
const Verification = db.user_verification;

const handleVerify = async (req, res) => {
  const params = req.query.token;

  const UserToVerify = await Verification.findOne({
    where: {
      veriCode: params,
    },
  });
  if (!UserToVerify) {
    return res.status(404).send({ message: "User not found" });
  }
  const { user_id, veriCode, codeExpire } = UserToVerify;
  const currentDate = new Date();
  if (codeExpire < currentDate) {
    return res.status(400).send({
      message: "Token expired",
    });
  }
  await Verification.update(
    { isVerified: true },
    { where: { user_id: user_id } }
  );
  return res.status(200).send(
    `<html>
    <head>
        <title>DziennikarzSportowy.pl</title>
    </head>
    <body>
        <h1>Weryfikacja udana</h1>
        <p>Dziękujemy za weryfikacje adresu email</p>
    </body>
</html>`
  );
};

module.exports = { handleVerify };
