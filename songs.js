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

    // testConnection();
    songsByArtist("eminem");
});

function displayResults(res) {
    for (let i = 0; i < res.length; i++) {
        console.log(`${res[i].song} by ${res[i].artist}`);
    }
}

function testConnection() {
    // test query for songs from after 2005
    connection.query("SELECT * FROM top5000 WHERE year > 2010", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(`Rows: ${res.length}`);
        displayResults(res);
        connection.end();
    });

}

function songsByArtist(artist) {
    connection.query("SELECT * FROM top5000 WHERE ?", { artist: artist }, function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(`${res.length} songs from ${artist}:`);
        displayResults(res);
        connection.end();
    });

}

function artistsMoreThanOnce() {

}

function dataRange() {

}

function dataForSong() {

}
/*
  * A query which returns all data for songs sung by a specific artist
  * A query which returns all artists who appear within the top 5000 more than once
  * A query which returns all data contained within a specific range
  * A query which searches for a specific song in the top 5000 and returns the data for it
*/
