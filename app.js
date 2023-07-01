//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/signup",function(req,res){
  res.render("signup.ejs");
})

app.get("/",function(req,res){
  const options = {};
  res.render("home.ejs", options);
})

app.listen(3000, function() {
    console.log("Server is up and running at port 3000!");
})