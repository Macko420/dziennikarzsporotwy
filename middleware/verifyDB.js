const db = require("../database/models");
// import { db } from "../database/models/index.js";

const verifyDB = (req, res, next) => {
  db.sequelize
    .authenticate()
    .then(() => {
      next();
    })
    .catch((error) => {
      console.error("Błąd połączenia z bazą danych:", error);
      return res.sendStatus(500);
    });
};

module.exports = verifyDB;
