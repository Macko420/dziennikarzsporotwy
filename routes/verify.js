const express = require("express");
const router = express.Router();
const verifyController = require("../controllers/verifyController.js");

router.get("/", verifyController.handleVerify);

module.exports = router;
