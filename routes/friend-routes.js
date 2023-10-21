const express = require("express");
const router = express.Router();
const {
  getNonFriends,
  addFriend,
  getFriends,
} = require("../controllers/user-controller");

router.post("/notfriend", getNonFriends);
router.post("/addfriend", addFriend);
router.post("/getfriend", getFriends);

module.exports = router;
