var mysql = require("mysql");
const credentials = require("../config/credentials.json")
const configuration = require("../config/config.json")

const envirorment = process.env.NODE_ENV || "development";
const config = configuration[envirorment];

var connection = mysql.createConnection({
    host     : process.env.DB_HOST || config.host,
    user     : process.env.DB_USER || credentials.movie_db.username,
    password : process.env.DB_PASS || credentials.movie_db.password,
    database : process.env.DB_NAME || config.database
  });

  connection.connect();

  //Queries the database
function getMovies(callback) {    
    connection.query("SELECT * FROM movie_db.movies",
        function (err, rows) {
            callback(err, rows); 
        }
    );    
}

function getPublications(callback) {
    connection.query("SELECT * FROM movie_db.publication",
    (err, rows) => {callback(err, rows)}
    );
}

function getReviewers(callback){
    connection.query("SELECT * FROM movie_db.reviewer",
    (err, rows) => {callback(err, rows)}
    );
}

module.exports = {
    getMovies,
    getPublications,
    getReviewers
}