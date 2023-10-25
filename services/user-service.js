const {
  getUserByEmail,
  insertUser,
  insertPost,
  getUnConnectedUser,
  insertFriend,
  getUserFriends,
  getPosts,
  logOutUser,
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
    // Set the IsLoggedIn flag as true in database
    await loginUser(user.email);
    const token = Generatetoken(user.email);

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

const createPostService = async (postDetails,email) => {
  try {
    const result = await insertPost(postDetails,email);

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

const getPostsService = async (email) => {
  try {
 
    return await getPosts(email);
  } catch (error) {
    throw error;
  }
};

const logoutService = async (email) => {
  try {
   
   
    await logOutUser(email);
    return {
      success: true,
      message: "Loged Out.",
    };
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
  logoutService
};
