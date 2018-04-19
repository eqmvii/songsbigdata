// songs.js

var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password", // so secure I know
    database: "top_songsDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log(`connected as ${connection.threadId}`);

    // test query for songs from after 2005
    connection.query("SELECT * FROM top5000 WHERE year > 2005", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(`Rows: ${res.length}`);
        connection.end();
    });

});
