var express = require("express");
var app = new express();
var bodyParser = require('body-parser')
var path = require('path')
var bodyParser = require('body-parser');

const mariadb = require('mariadb');
const pool = mariadb.createPool({host: '140.118.110.32', user:'ws_user', password:'ws_fall108', database:'ilibrary_test', port:'53306'});


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization, X-Requested-With, Content-Type, X-HTTP-Method");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header("Content-Type", "application/json");
  next();
});

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());

app.get('/',function(req, res, next){

});

//Start Server
app.listen(8080, function(err) {
    if (err)
        console.log(err.message);
    else
        console.log("Server is running");
});


// home page
app.get("/api/books/", function(req, resp, next) {
  let myObj = {
    "books":[],
    "error":false,
    "message":""
  };
  console.log(req.query.bid);
  if(req.query.length==0){
    pool.getConnection()
      .then(conn => {
        conn.query("SELECT * From book")
          .then((res) => {
            console.log(res);
            myObj.books = res;
            resp.json(myObj);
            conn.end();
          })
          .catch(err => {
            //handle error
            myObj.error = true;
            console.log(err);
            resp.json(myObj);
            conn.end();
          })
      }).catch(err => {
        //not connected
        myObj.error = true;
        resp.json(myObj);
        console.log(err)
      });
  }else{
    pool.getConnection()
      .then(conn => {
        conn.query("SELECT * From book WHERE id ="+req.query.bid)
          .then((res) => {
            console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
            myObj.books = res;
            resp.json(myObj);
            conn.end();
          })
          .catch(err => {
            //handle error
            myObj.error = true;
            console.log(err);
            resp.json(myObj);
            conn.end();
          })
      }).catch(err => {
        //not connected
        myObj.error = true;
        resp.json(myObj);
        console.log(err)
      });
  }
});

// Not found page
app.get("*", function(req, resp, next) {
    resp.end("Not found page");
});
