const {
  getUserByEmail,
  insertUser,
  insertPost,
  getUnConnectedUser,
  insertFriend,
  getUserFriends,
  getPosts,
  loginUser,
} = require("../models/user-query");

const {
  comparePassword,
  hashPassword,
  Generatetoken,
} = require("../helpers/auth");

const insertUserService = async (userDetails) => {
  try {
    const [user] = await getUserByEmail(userDetails.email);
    if (user) {
      throw new Error("Please Use Different Email");
    }
    userDetails.password = await hashPassword(userDetails.password);

    await insertUser(userDetails);

    return {
      success: true,
      message: "User added successfully",
    };
  } catch (error) {
    throw error;
  }
};

const loginService = async (email, password) => {
  try {
    const [user] = await getUserByEmail(email);

    if (!user) {
      throw new Error("Login failed. Invalid email !");
    }

    const isSame = await comparePassword(password, user.password);

    if (!isSame) {
      throw new Error("Login failed. Invalid password !");
    }

    const token = Generatetoken(user.Email);

    return {
      success: true,
      message: "Loged In.",
      user: {
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
      },
      token: token,
    };
  } catch (error) {
    throw error;
  }
};

const createPostService = async (postDetails) => {
  try {
    const result = await insertPost(postDetails);

    return {
      success: true,
      message: "post added successfully",
    };
  } catch (error) {
    throw error;
  }
};

const UnconnectedUsersService = async (friendDetails) => {
  try {
    return await getUnConnectedUser(friendDetails);
  } catch (error) {
    throw error;
  }
};

const addFriendService = async (friendDetails) => {
  try {
    await insertFriend(friendDetails);
    return {
      success: true,
      message: "Added Friend successfully",
    };
  } catch (error) {
    throw error;
  }
};

const getFriendsService = async (userDetails) => {
  try {
    return await getUserFriends(userDetails);
  } catch (error) {
    throw error;
  }
};

const getPostsService = async (userDetails) => {
  try {
    console.log("p2");
    return await getPosts(userDetails);
  } catch (error) {
    throw error;
  }
};
module.exports = {
  insertUserService,
  loginService,
  createPostService,
  UnconnectedUsersService,
  addFriendService,
  getFriendsService,
  getPostsService,
};
