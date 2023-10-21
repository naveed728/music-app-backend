const express = require("express");
const router = express.Router();
const { addPost, getPosts } = require("../controllers/user-controller");

router.post("/addpost", addPost);
router.post("/getposts", getPosts);

module.exports = router;
