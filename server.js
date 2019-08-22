// Get our dependencies
var express = require('express');
var app = express();
var dao = require('./data_model/dao')
var os = require( 'os' );
const configuration = require("./config/config.json")

const envirorment = process.env.NODE_ENV || "development";
const config = configuration[envirorment];


//Testing endpoint
app.get('/', function(req, res){
  const networkInterfaces = os.networkInterfaces();
  var current_ip = null;

  for (const inter of Object.values(networkInterfaces)) {
    for(const inter_i of inter) {
      if(inter_i["family"] == 'IPv4' && inter_i["internal"] == false) {
        current_ip = inter_i["address"];
      }
    }
  }

  var response = [{response : {ip: current_ip}}, {code : '200'}, {env: envirorment}, {db_host: process.env.DB_HOST}]
  res.json(response);
})

// Implement the movies API endpoint
app.get('/movies', function(req, res){
  
  dao.getMovies((err, rows) => {
    res.json(rows);
  })
})

// Implement the reviewers API endpoint
app.get('/reviewers', function(req, res){
  dao.getReviewers((err, rows) => {
    res.json(rows);
  });
})

// Implement the publications API endpoint
app.get('/publications', function(req, res){
  dao.getPublications((err, rows) => {
    res.json(rows);
  });  
})

// Implement the pending reviews API endpoint
app.get('/pending', function(req, res){
  dao.getPendings((err, rows) => {
    res.json(rows)
  });
})

const PORT = process.env.PORT || config.node_port;

if(!process.env.PORT){
  console.log("WARNING: no envirorment configuration detected for PORT the default was used");
}
console.log("server listening through port: " + PORT);
// Launch our API Server and have it listen on port 3000.
app.listen(PORT);
module.exports = app;
