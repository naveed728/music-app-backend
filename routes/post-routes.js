const express = require("express");
const router = express.Router();
const { addPost, getPosts } = require("../controllers/user-controller");
const { tokenVerification } = require("../middleware/authentication");


router.post("/addpost",  tokenVerification,addPost);
router.get("/getposts", tokenVerification,getPosts);

module.exports = router;
