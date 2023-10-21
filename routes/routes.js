const express = require("express");
const router = express.Router();

const user = require("./user-routes");
const post = require("./post-routes");
const friend = require("./friend-routes");

router.use("/users", user);
router.use("/posts", post);
router.use("/friends", friend);

module.exports = router;
