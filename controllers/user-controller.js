const {
    addUserService,
    loginService
} = require("../services/user-service");

const validateField = (field, fieldName) => {
  if (!field) {
    throw new Error(`Valid ${fieldName} is required!`);
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

      const result = await addUserService(userDetails);
      
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
  
      if (!email) {
        throw new Error("Email is not valid.");
      }
      if (!password) {
        throw new Error("password is not valid");
      }
  
      console.log("point 1")
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
  
  module.exports = { appendUser , login}
