module.exports = {
  insertUserSql:
    "INSERT INTO user(first_name, last_name, email, `password`) VALUES (?, ?, ?, ?)",
  getUserByEmailSql: "SELECT * FROM user WHERE email = ?",
  insertPostSql: "INSERT INTO posts(body, userid) VALUES (?, ?)",
  getUnConnectedUserSql: `
    SELECT u.*
    FROM user u
    WHERE u.userid <> ?
    AND u.userid NOT IN (
      SELECT DISTINCT f.frienduserid
      FROM friends f
      WHERE f.userid = ?
      UNION
      SELECT DISTINCT f.userid
      FROM friends f
      WHERE f.frienduserid = ?
    );
  `,
  insertFriendSql: "INSERT INTO friends(userid,frienduserid) VALUES(?,?)",
  getUserFriendsSql: `SELECT u.*
  FROM user u
  WHERE u.userid <> ?
  AND u.userid IN (
    SELECT DISTINCT f.frienduserid
    FROM friends f
    WHERE f.userid = ?
    UNION
    SELECT DISTINCT f.userid
    FROM friends f
    WHERE f.frienduserid = ?
  );`,
  getPostsSql: "SELECT * FROM posts WHERE userid <>  ?",
};
