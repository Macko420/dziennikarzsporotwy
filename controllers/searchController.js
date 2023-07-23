const db = require("../database/models");
const Articles = db.article;

const { Op } = require("sequelize");

const handleSearch = async (req, res) => {
  const params = req.query.n;
  let arr = params.split(" ");
  const articles = await Articles.findAll({
    attributes: [
      "article_id",
      "title",
      "img",
      [
        db.Sequelize.literal(`CASE
        WHEN title REGEXP '(${arr.join(
          "|"
        )})' THEN CONCAT('title:', REGEXP_SUBSTR(title, '(${arr.join("|")})'))
        WHEN text REGEXP '(${arr.join(
          "|"
        )})' THEN CONCAT('text:', REGEXP_SUBSTR(text, '(${arr.join("|")})'))
        ELSE NULL
      END`),
        "found_in",
      ],
    ],
    where: {
      [Op.or]: [
        { title: { [Op.regexp]: `(${arr.join("|")})` } },
        { text: { [Op.regexp]: `(${arr.join("|")})` } },
      ],
    },
  });

  return res.json(articles);
};

// SELECT article_id
// FROM articles
// WHERE title LIKE '%spr2%' OR text LIKE '%spr2%'
// ORDER BY
//   CASE WHEN title LIKE '%spr2%' THEN 0 ELSE 1 END,
//   CASE WHEN text LIKE '%spr2%' THEN 0 ELSE 1 END,
//   article_id;

// SELECT article_id,
//     CASE
//         WHEN title LIKE '%text%' THEN 'Znaleziono w tytule'
//         WHEN text LIKE '%text%' THEN 'Znaleziono w tekście'
//         ELSE 'Nie znaleziono'
//     END AS found_in
// FROM your_table
// WHERE title LIKE '%text%' OR text LIKE '%text%';

module.exports = { handleSearch };
