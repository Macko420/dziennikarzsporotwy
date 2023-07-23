const db = require("../database/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
require("dotenv").config();

const User = db.user_email;

const handleLogin = async (req, res) => {
  console.log("req.body: ", req.body);
  // console.log("res", res);
  let { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = await User.findOne({
    where: {
      [Op.or]: [
        {
          username: user,
        },
        {
          email: user,
        },
      ],
    },
  });
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  console.log("foundUser: ", foundUser);
  user = foundUser.username;
  console.log("user: ", user);
  // evaluate password
  console.log("pwd pre match: ");
  const match = await bcrypt.compare(pwd, foundUser.password);
  console.log("pwd match: ", match);
  if (match) {
    // create JWTs
    const accessToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "2h" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    const { email } = foundUser;
    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    const toCookie = "email " + refreshToken;

    res.cookie("jwt", toCookie, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken, email, user });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
