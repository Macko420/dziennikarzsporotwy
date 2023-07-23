module.exports = (sequelize, Sequelize) => {
  const user_verification = sequelize.define("UserVerification", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    veriCode: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    codeExpire: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  });
  return user_verification;
};
