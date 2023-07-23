const express = require("express");
const router = express.Router();
const addCommentController = require("../controllers/addCommentController");
const verifyAuth = require("../middleware/verifyAuth");

router.post("/comm/:id", addCommentController.handleGetComment);
router.post("/", verifyAuth, addCommentController.handeAddComment);

module.exports = router;
