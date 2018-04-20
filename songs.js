// songs.js
// SQL queries against a huge database of songs
// for learning

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
    // songsByArtist("eminem");
    // artistsMoreThanOnce();
    // dataRange();
    // dataForSong("Hey Jude");
    SongAndAlbumSearch("Eminem");
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
    var queryString = `SELECT COUNT(artist), artist
    FROM top5000
    GROUP BY artist
    HAVING COUNT(artist) > 30
    ORDER BY COUNT(artist) DESC;`
    connection.query(queryString, function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(`${res[i].artist}: ${res[i]["COUNT(artist)"]}`);
        }
        connection.end();
    });


}

function dataRange() {
    // "SELECT  FROM top5000 WHERE position BETWEEN ? AND ?";
    var queryString = `SELECT position,song,artist,year FROM top5000 WHERE year BETWEEN 2011 AND 2012;`
    connection.query(queryString, function (err, res) {
        if (err) throw err;
        console.log(`There were ${res.length} results!`);
        connection.end();
    });

}

function dataForSong(song) {
    connection.query("SELECT * FROM top5000 WHERE ?", { song: song }, function (err, res) {
        if (err) throw err;
        console.log(`${res[0].song} by ${res[0].artist} at ${res[0].raw_total} made up points`);
        connection.end();
    });
}

// finds a match where both album and song were in the top 100
function SongAndAlbumSearch(artist) {
    // "SELECT  FROM top5000 WHERE position BETWEEN ? AND ?";
    var queryString = `SELECT s.song, a.artist, a.year, a.album, a.position as aPosition, s.position as sPosition
    FROM top5000 as s
    INNER JOIN topAlbums as a
    ON a.year = s.year AND a.artist = s.artist
    WHERE a.artist = ?
    AND s.artist = ?
    AND s.position < 100
    AND a.position < 100;`
    connection.query(queryString, [artist, artist], function (err, res) {
        if (err) throw err;
        console.log(res.length);
        for (let i = 0; i < res.length; i++) {
            console.log(res[i]);
        }
        connection.end();
    });
}

