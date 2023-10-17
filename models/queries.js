module.exports = {
  insertUserSql:
    "INSERT INTO user(first_name, last_name, email, `password`) VALUES (?, ?, ?, ?)",
    selectUserByEmailSql: "SELECT * FROM user WHERE email = ?",

};

