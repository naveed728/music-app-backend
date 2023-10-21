const express = require("express");
const router = express.Router();
const { appendUser, login } = require("../controllers/user-controller");

router.post("/adduser", appendUser);
router.post("/login", login);

module.exports = router;
