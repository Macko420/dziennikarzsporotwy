const bcrypt = require("bcrypt");
const db = require("../database/models");
const User = db.user_email;
const Userverify = db.user_verification;
const { Op } = require("sequelize");
const { veriCode } = require("../functions/generateCode");
const { codeSend } = require("../nodemailer/sendVeriCode");

const handleNewUser = async (req, res) => {
  const { user, pwd, email } = req.body;
  // const emil = email;
  // console.log(user, pwd, email);
  if (!user || !pwd || !email)
    return res
      .status(400)
      .json({ message: "Username, email and password are required." });
  // check for duplicate usernames in the db
  const duplicate = await User.findOne({
    where: {
      [Op.or]: [
        {
          username: user,
        },
        {
          email: email,
        },
      ],
    },
  });
  // console.log("dup: ", duplicate);
  if (duplicate) {
    return res.sendStatus(409); //Conflict
  }
  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    const { code, date, link } = await veriCode(user);
    console.log("code: ", code, date);

    //store the new user
    await codeSend(link, email).catch(console.error);
    await User.create({
      username: user,
      email: email,
      password: hashedPwd,
      type: "email",
      refreshToken: "",
    });
    Userverify.create({
      user_id: user,
      isVerified: false,
      veriCode: code,
      codeExpire: date,
    });

    //send an email with the verification code

    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
