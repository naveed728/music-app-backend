const {
  insertUserService,
  loginService,
  createPostService,
  UnconnectedUsersService,
  addFriendService,
  getFriendsService,
  getPostsService,
  logoutService
} = require("../services/user-service");

const { ValidateEmail } = require("../helpers/validate-email");

const validateField = (field, fieldName) => {
  if (!field) {
    throw new Error(`Valid ${fieldName} is required!`);
  }
  if (fieldName == "Email" && !ValidateEmail(field)) {
    throw new Error(`Invalid Email id`);
  }
};

const validateUserDetails = (userDetails) => {
  validateField(userDetails.first_name, "First name");
  validateField(userDetails.last_name, "Last name");
  validateField(userDetails.email, "Email");
  validateField(userDetails.password, "Password");
};

const appendUser = async (req, res) => {
  try {
    let userDetails = req.body;

    validateUserDetails(userDetails);

    userDetails.password = Buffer.from(userDetails.password, "base64").toString(
      "utf-8"
    );

    const result = await insertUserService(userDetails);

    return res
      .status(200)
      .json({ success: result.success, message: result.message });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    var { email, password } = req.body;

    if (!email || !ValidateEmail(email)) {
      throw new Error("Email is not valid.");
    }
    if (!password) {
      throw new Error("password is not valid");
    }

    password = Buffer.from(password, "base64").toString("utf-8");

    const result = await loginService(email, password);

    return res.status(200).json({
      success: result.success,
      message: result.message,
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const addPost = async (req, res) => {
  const postDetails = req.body;
  const email = req.user.email;

  if (!postDetails.body) {
    throw new Error("Request is not valid provide data to store");
  }

  const result = await createPostService(postDetails,email);
  return res.status(200).json({
    success: "sucess",
    message: "It hit the api",
  });
};

const getNonFriends = async (req, res) => {
  try {
    const friendDetails =  req.user.email;
    console.log(friendDetails)
    const result = await UnconnectedUsersService(friendDetails);

    return res.status(200).json({
      success: result.success,
      message: result.message,
      users: result.user,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const addFriend = async (req, res) => {
  try {
    const friendDetails = req.body;
    const result = await addFriendService(friendDetails);

    return res.status(200).json({
      success: result.success,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getFriends = async (req, res) => {
  try {
    const userDetails = req.user.email;
    const result = await getFriendsService(userDetails);

    return res.status(200).json({
      success: result.success,
      message: result.message,
      users: result.user,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getPosts = async (req, res) => {
  try {

    console.log("mee")
    const email = req.user.email;
    console.log(email)
    const result = await getPostsService(email);

    return res.status(200).json({
      success: result.success,
      message: result.message,
      posts: result.posts,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const logout = async (req, res) => {
  try {

    const {email} = req.user;

    const result = await logoutService(email);
  
    return res.status(200).json({
      success: result.success,
      message: result.message
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  appendUser,
  login,
  addPost,
  getNonFriends,
  addFriend,
  getFriends,
  getPosts,
  logout
};
