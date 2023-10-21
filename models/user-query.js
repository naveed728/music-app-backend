const { connection } = require("../dbconnection");
const {
  insertUserSql,
  insertPostSql,
  getUserByEmailSql,
  getUnConnectedUserSql,
  insertFriendSql,
  getUserFriendsSql,
  getPostsSql,
} = require("./queries");

const insertUser = async (userDetails) => {
  const { first_name, last_name, email, password } = userDetails;
  try {
    await connection.query(insertUserSql, [
      first_name,
      last_name,
      email,
      password,
    ]);
    return;
  } catch (error) {
    console.log("dcsbds");
    throw new Error("Error adding new user !");
  }
};

const getUserByEmail = async (email) => {
  try {
    const [rows] = await connection.query(getUserByEmailSql, email);
    return rows;
  } catch (error) {
    throw new Error("Error fetchng user !");
  }
};

const loginUser = async (userId) => {
  try {
    await connection.query(updateLoginStatusSql, userId);
    return;
  } catch (error) {
    throw new Error("Error logging in the user !");
  }
};

const insertPost = async (postDetails) => {
  const { userid, body } = postDetails;
  try {
    await connection.query(insertPostSql, [body, userid]);
    return;
  } catch (error) {
    throw new Error("Error adding new post!");
  }
};

const getUnConnectedUser = async (friendDetails) => {
  const { userid } = friendDetails;
  try {
    const [friendlist] = await connection.query(getUnConnectedUserSql, [
      userid,
      userid,
      userid,
    ]);
    console.log(friendlist);
    return {
      success: true,
      message: "fetched",
      user: friendlist,
    };
  } catch (error) {
    throw new Error("Error getting unconnected users!");
  }
};

const insertFriend = async (friendDetails) => {
  try {
    const { userid, frienduserid } = friendDetails;

    await connection.query(insertFriendSql, [userid, frienduserid]);
    return;
  } catch (error) {}
  throw new Error("Error adding new friend !");
};

const getUserFriends = async (userDetails) => {
  const { userid } = userDetails;
  try {
    const [friendlist] = await connection.query(getUserFriendsSql, [
      userid,
      userid,
      userid,
    ]);
    return {
      success: true,
      message: "fetched",
      user: friendlist,
    };
  } catch (error) {
    throw new Error("Error getting unconnected users!");
  }
};

const getPosts = async (userDetails) => {
  const { userid } = userDetails;
  try {
    const [postlist] = await connection.query(getPostsSql, [userid]);
    return {
      success: true,
      message: "fetched",
      posts: postlist,
    };
  } catch (error) {
    throw new Error("Error getting unconnected users!");
  }
};

module.exports = {
  insertUser,
  getUserByEmail,
  insertPost,
  getUnConnectedUser,
  insertFriend,
  getUserFriends,
  getPosts,
};
