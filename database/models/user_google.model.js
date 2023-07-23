module.exports = (sequelize, Sequelize) => {
  const UserGoogle = sequelize.define("user_google", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    refreshToken: {
      type: Sequelize.TEXT("long"),
      allowNull: true,
    },
  });
  return UserGoogle;
};
