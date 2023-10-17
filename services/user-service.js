const {
    selectUserByEmail,
    addNewUser,
    loginUser
} = require("../models/user-query");

const {
    comparePassword,
    hashPassword,
    Generatetoken,
  } = require("../helpers/auth");

const addUserService = async (userDetails) => {
    try {
      
      userDetails.password = await hashPassword(userDetails.password);

      // Adding  new user
      await addNewUser(userDetails);
  
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
      // chech if user already present
      const [user] = await selectUserByEmail(email);
      console.log(user)
      if (!user) {
        throw new Error("Login failed. Invalid email !");
      }
  
      // Comparing the password sent by the user with the password stored in database
      const isSame = await comparePassword(password, user.password);

      console.log(isSame)
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


  module.exports = {
    addUserService,
    loginService
  }
