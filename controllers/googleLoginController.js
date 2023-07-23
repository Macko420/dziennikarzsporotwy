const db = require("../database/models");
const User = db.user_google;
const { verifyGoogleToken } = require("./verifyGoogleToken");
const jwt = require("jsonwebtoken");

const handlerAuth = async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;

      //check if user exist in db to dont duplicate
      const foundUser = await User.findOne({
        where: { email: profile.email },
      });

      if (!foundUser) {
        return res.status(400).json({
          message: "You are not registered. Please sign up",
        });
      }

      const accessToken = jwt.sign(
        { username: profile?.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15min" }
      );

      const refreshToken = jwt.sign(
        { username: profile?.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      foundUser.refreshToken = refreshToken;
      const result = await foundUser.save();

      const toCookie = "google " + refreshToken;

      res.cookie("jwt", toCookie, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(201).json({
        message: "Login was successful",
        user: {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          // picture: profile?.picture,
          email: profile?.email,
          token: accessToken,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error?.message || error,
    });
  }
};

module.exports = { handlerAuth };
