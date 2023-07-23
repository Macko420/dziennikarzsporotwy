const db = require("../database/models");
const UserEmail = db.user_email;
const UserGoogle = db.user_google;

const handleLogout = async (req, res) => {
  let foundUser = "";
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204); //No coookie
  }
  const cookie = cookies.jwt.split(" ");
  const refreshToken = cookie[1];

  // check if refresh tocken exist in db
  if (cookie[0] == "email") {
    foundUser = await UserEmail.findOne({
      where: { refreshToken: refreshToken },
    });
  } else if (cookie[0] == "google") {
    foundUser = await UserGoogle.findOne({
      where: { refreshToken: refreshToken },
    });
  }

  //delelet cookie on client site
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); //del client http only cookie
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  foundUser.refreshToken = "";
  const result = await foundUser.save();

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};

module.exports = { handleLogout };
