const { hash, compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error("Error comparing passwords.");
  }
};

const hashPassword = async (password) => {
  try {
    const hashedPassword = await hash(password, 10);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error while hashing the password.");
  }
};

const Generatetoken = (email) => {
  return sign({ email }, process.env.SECRET, { expiresIn: process.env.EXPIRY });
};

module.exports = {
  hashPassword,
  comparePassword,
  Generatetoken,
};
