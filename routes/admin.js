const express = require("express");
const multer = require("multer");
const router = express.Router();
const adminVerify = require("../middleware/admin");
const verifyAuth = require("../middleware/verifyAuth");
const adminController = require("../controllers/adminController.js");
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.post("/login", adminController.handleAdminLogin);
router.post("/", verifyAuth, adminVerify, adminController.handleAdmin);

router.post(
  "/upload",
  verifyAuth,
  upload.array("imgs"),

  adminVerify,
  adminController.handleAdd
);

module.exports = router;
