const { connection } = require("../dbconnection");
const {
  insertUserSql,
  insertPostSql,
  getUserByEmailSql,
  getUnConnectedUserSql,
  insertFriendSql,
  getUserFriendsSql,
  getPostsSql,
  logOutUserSql,
  logInUserSql
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

const loginUser = async (email) => {
  try {
    await connection.query(logInUserSql,email);
    return;
  } catch (error) {
    throw new Error("Error logging in the user !");
  }
};

const insertPost = async (postDetails, email) => {
  try {
    const [user] = await connection.query(getUserByEmailSql, email);
    const userid = user[0].userid;

    await connection.query(insertPostSql, [postDetails.body, userid]);
  } catch (error) {
    throw new Error("Error adding new post!");
  }
};

const getUnConnectedUser = async (friendDetails) => {
  const [user] = await connection.query(getUserByEmailSql,friendDetails);
   const userid = user[0].userid;
  try {
    const [friendlist] = await connection.query(getUnConnectedUserSql, [
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

const insertFriend = async (friendDetails) => {
  try {
    const { userid, frienduserid } = friendDetails;

    await connection.query(insertFriendSql, [userid, frienduserid]);
    return;
  } catch (error) {}
  throw new Error("Error adding new friend !");
};

const getUserFriends = async (friendDetails) => {
   const [user] = await connection.query(getUserByEmailSql,friendDetails);
   const userid = user[0].userid;
  console.log(userid)
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

const getPosts = async (email) => {

  try {
    const [postlist] = await connection.query(getPostsSql, [email]);
    
    return {
      success: true,
      message: "fetched",
      posts: postlist,
    };
  } catch (error) {
    throw new Error("Error getting unconnected users!");
  }
};

const logOutUser = async(email) => {
  try{
    await connection.query(logOutUserSql,email);
  }
  catch(error){
    throw new Error("Error logging out user");
  }
}
module.exports = {
  insertUser,
  getUserByEmail,
  insertPost,
  getUnConnectedUser,
  insertFriend,
  getUserFriends,
  getPosts,
  logOutUser,
  loginUser
};
