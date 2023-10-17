const { connection } = require("../dbconnection");
const {
    insertUserSql,
    selectUserByEmailSql
  } = require("./queries");

  
  const addNewUser = async (userDetails) => {
    const { first_name, last_name, email, password } = userDetails;
    try {
      // Insert new user to the database
      await connection.query(insertUserSql, [first_name, last_name, email, password]);
      return;
    } catch (error) {
        console.log("dcsbds")
      throw new Error("Error adding new user !");
    }
  };

  
const selectUserByEmail = async (email) => {
    try {
      // Fetch the rows with the same email
      const [rows] = await connection.query(selectUserByEmailSql, email);
      return rows;
    } catch (error) {
      throw new Error("Error fetchng user !");
    }
  };

  const loginUser = async (userId) => {
    try {
      // Set the IsLoggedIn flag as true in database
      await connection.query(updateLoginStatusSql, userId);
      return;
    } catch (error) {
      throw new Error("Error logging in the user !");
    }
  };

  module.exports = { addNewUser,selectUserByEmail  };
