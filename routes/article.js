const express = require("express");
const router = express.Router();
const articeController = require("../controllers/articleController.js");

router.get("/lastArticle", articeController.getLastArticle);
router.get("/id/:id", articeController.getArticle);
router.get("/popular", articeController.getPopularArticles);
router.get("/all", articeController.getAllArticles);

module.exports = router;
