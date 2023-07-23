const { verifyGoogleToken } = require("./verifyGoogleToken");
const db = require("../database/models");
const User = db.user_google;

const handleNewGoogleUser = async (req, res) => {
  if (req.body.credential) {
    const verificationResponse = await verifyGoogleToken(req.body.credential);

    if (verificationResponse.error) {
      console.log("veri err", verificationResponse);
      return res.status(400).json({
        message: verificationResponse.error,
      });
    }

    const profile = verificationResponse?.payload;
    console.log(profile);
    const user = {
      firstName: profile?.given_name,
      lastName: profile?.family_name,
      picture: profile?.picture,
      email: profile?.email,
      // token: jwt.sign({ email: profile?.email }, process.env.JWT_SECRET, {
      //   expiresIn: "1d",
      // }),
    };

    //checking if duplicated
    const duplicate = await User.findOne({ where: { email: user.email } });
    if (duplicate) {
      return res.sendStatus(409); //conflict
    }

    User.create({
      username: `${user.firstName}${user.lastName ? " " + user.lastName : ""}`,
      email: user.email,
      type: "google",
    });

    // User.findAll().then((users) => {
    //   console.log(users[0].dataValues);
    // });

    res.status(201).json({
      message: "Signup was successful",
    });
  }
};

module.exports = { handleNewGoogleUser };
