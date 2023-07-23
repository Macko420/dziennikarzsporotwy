const db = require("../database/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
// import { db } from "../database/models/index.js";
const UserEmail = db.user_email;
const admin = async (req, res, next) => {
  const user = res.locals.user.username;
  if (!user) return res.sendStatus(401);
  const foundUser = await UserEmail.findOne({
    where: {
      [Op.and]: [
        {
          username: user,
        },
        {
          type: "admin",
        },
      ],
    },
  });

  if (!foundUser) {
    return res.sendStatus(401);
  } else {
    // debugger;
    next();
  }
};

module.exports = admin;
