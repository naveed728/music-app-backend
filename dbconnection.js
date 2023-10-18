const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'naveedkhan11',
  database: 'music_app',
}).promise();

module.exports = { connection };
