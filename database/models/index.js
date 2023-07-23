const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  dialect: dbConfig.dialect,
  host: dbConfig.HOST,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user_email = require("./user_email.model")(sequelize, Sequelize);
db.user_google = require("./user_google.model")(sequelize, Sequelize);
db.article = require("./article.model")(sequelize, Sequelize);
db.comment = require("./comment.model")(sequelize, Sequelize);
db.user_verification = require("./user_verification.model")(
  sequelize,
  Sequelize
);

db.user_email.hasMany(db.user_verification, {
  sourceKey: "username",
  foreignKey: "user_id",
});

db.user_verification.belongsTo(db.user_email, {
  targetKey: "username",
  foreignKey: "user_id",
});

db.user_email.hasMany(db.comment, {
  sourceKey: "username",
  foreignKey: "userId",
});

db.comment.belongsTo(db.user_email, {
  targetKey: "username",
  foreignKey: "userId",
});

db.article.hasMany(db.comment, {
  sourceKey: "article_id",
  foreignKey: "articleId",
});

db.comment.belongsTo(db.article, {
  targetKey: "article_id",
  foreignKey: "articleId",
});

module.exports = db;
