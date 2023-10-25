const express = require("express");
const router = express.Router();
const {
  getNonFriends,
  addFriend,
  getFriends,
} = require("../controllers/user-controller");
const { tokenVerification } = require("../middleware/authentication");

router.get("/notfriend",tokenVerification, getNonFriends);
router.post("/addfriend", addFriend);
router.get("/getfriend",tokenVerification, getFriends);

module.exports = router;
