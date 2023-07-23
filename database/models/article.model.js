module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define(
    "article",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      article_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      text: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      likes: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      views: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      img: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tags: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      snippet: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: [`article_id`],
        },
      ],
    }
  );

  return Article;
};
