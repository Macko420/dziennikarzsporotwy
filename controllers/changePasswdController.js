const db = require("../database/models");
const User = db.user_email;
const bcrypt = require("bcrypt");

// const jwt = require("jsonwebtoken");
require("dotenv").config();

const handeChangePasswd = async (req, res) => {
  const { username, pwd, newPwd } = await req.body;
  console.log("body: ", req.body);
  if (!username || !pwd || !newPwd) {
    console.log("Provide required data");
    return res.status(400).json({ message: "Provide required data" });
  }

  const foundUser = await User.findOne({ where: { username: username } });

  if (!foundUser) return res.sendStatus(401); //Unauthorized
  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const hashedPwd = await bcrypt.hash(newPwd, 10);

    foundUser.password = hashedPwd;
    await foundUser.save();

    res.status(201).json({ success: `Password changed for ${username}!` });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handeChangePasswd };
