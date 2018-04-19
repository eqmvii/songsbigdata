// songs.js

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password", // so secure I know
  database: "top_songsDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log(`connected as ${connection.threadId}`);
    connection.end();
  });
