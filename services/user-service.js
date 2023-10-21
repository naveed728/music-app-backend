const {
    getUserByEmail,
    insertUser,
    loginUser
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
      console.log(user)
      if (!user) {
        throw new Error("Login failed. Invalid email !");
      }
      console.log(password);
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
    insertUserService,
    loginService
  }
