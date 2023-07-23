const express = require("express");
const router = express.Router();
const loginGoogleControler = require("../controllers/googleLoginController");

router.post("/", loginGoogleControler.handlerAuth);

module.exports = router;
