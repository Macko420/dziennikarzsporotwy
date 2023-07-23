const express = require("express");
const router = express.Router();
const registerController = require("../controllers/emailRegisterController");

router.post("/", registerController.handleNewUser);

module.exports = router;
