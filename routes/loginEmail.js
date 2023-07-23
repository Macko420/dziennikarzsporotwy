const express = require("express");
const router = express.Router();
const loginEmailController = require("../controllers/emailLoginController");

router.post("/", loginEmailController.handleLogin);

module.exports = router;
