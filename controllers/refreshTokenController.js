const db = require("../database/models");
const UserEmail = db.user_email;
const UserGoogle = db.user_google;

const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = async (req, res) => {
  console.log("refresh");
  const cookies = req.cookies;
  let foundUser = "";
  if (!cookies?.jwt) {
    console.log("no cookie");
    return res.sendStatus(401);
  }

  const cookie = cookies.jwt.split(" ");
  const refreshToken = cookie[1];
  //chcek email/google
  if (cookie[0] == "email") {
    foundUser = await UserEmail.findOne({
      attributes: ["username", "refreshToken", "email"],
      where: { refreshToken: refreshToken },
    });
  } else if (cookie[0] == "google") {
    foundUser = await UserGoogle.findOne({
      attributes: ["username", "refreshToken"],
      where: { refreshToken: refreshToken },
    });
  }

  if (!foundUser) {
    return res.sendStatus(403); //Forbidden
  }

  const userName = foundUser.username;
  const email = foundUser.email;

  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ userName, accessToken, email });
  });
};

module.exports = { handleRefreshToken };
