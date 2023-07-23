const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
  const aHeader = req.headers.authorization || req.headers.Authorization;
  if (!aHeader?.includes("Bearer ")) {
    console.log("no token");
    return res.sendStatus(401);
  }

  const token = aHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log("invalid token");
      return res.sendStatus(403); //invalid token
    }
    // console.log("token verified", token, "decoded", decoded);
    res.locals.user = decoded;
    next();
  });
};

module.exports = verifyAuth;
