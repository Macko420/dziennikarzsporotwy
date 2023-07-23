const db = require("../database/models");
const Articles = db.article;

function getArticle(req, res) {
  const params = req.params.id;
  Articles.findOne({
    where: { article_id: params },
  }).then(function (result) {
    // console.log(result);
    res.send(result);
  });
}

async function getLastArticle(req, res) {
  const params = Number(req.query.n);
  const offset = Number(req.query.o);
  Articles.findAll({
    limit: params ? params : 1,
    offset: parseInt(offset),
    order: [["id", "DESC"]],
  }).then(function (result) {
    // console.log(result);
    res.send(result);
  });
}

function getPopularArticles(req, res) {
  Articles.findOne({
    order: [["likes", "DESC"]],
  }).then(function (result) {
    // console.log(result);
    res.send(result);
  });
}

function getAllArticles(req, res) {
  const { page, limit } = req.query;
  const offset = (page - 1) * limit;
  console.log("offset: ", offset, "limit: ", limit);
  Articles.findAll({
    order: [["id", "ASC"]], // sortowanie według kolumny id rosnąco
    offset: parseInt(offset),
    limit: parseInt(limit),
  }).then(function (result) {
    // console.log(result);
    res.send(result);
  });
}

module.exports = {
  getArticle: getArticle,
  getLastArticle: getLastArticle,
  getPopularArticles: getPopularArticles,
  getAllArticles: getAllArticles,
};
