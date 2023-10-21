module.exports = {
  insertUserSql:
    "INSERT INTO user(first_name, last_name, email, `password`) VALUES (?, ?, ?, ?)",
    getUserByEmailSql: "SELECT * FROM user WHERE email = ?",

};

