const express = require("express");
const router = express.Router();
const { appendUser, login, logout } = require("../controllers/user-controller");
const { tokenVerification } = require("../middleware/authentication");


router.post("/adduser", appendUser);
router.post("/login",login);
router.post("/logout", tokenVerification,logout)

module.exports = router;
