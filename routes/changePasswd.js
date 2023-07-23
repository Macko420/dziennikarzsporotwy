const express = require("express");
const router = express.Router();
const changePasswdController = require("../controllers/changePasswdController");
const verifyAuth = require("../middleware/verifyAuth");

router.post("/", verifyAuth, changePasswdController.handeChangePasswd);

module.exports = router;
