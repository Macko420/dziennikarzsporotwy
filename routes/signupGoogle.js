const express = require("express");
const router = express.Router();
const registerController = require("../controllers/googleRegisterController");

router.post("/", registerController.handleNewGoogleUser);

module.exports = router;
