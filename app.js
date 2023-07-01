//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/signup", function (req, res) {
  res.sendFile("./signUp.html");
});

app.post("/signup", function (req, res) {
  const fName = req.body.fName;
  const lName = req.body.lName;
  const email = req.body.email;

  const data = {
      members: [{
          email_address: email,
          status: "subscribed",
          merge_fields: {
              FNAME: fName,
              LNAME: lName,
          }
      }]
  }

  const jsonData=JSON.stringify(data);
  
  const url="https://us21.api.mailchimp.com/3.0/lists/f66ab55bbd"
  const options = {
      method:"POST",
      auth:"Aashish:0b4b55f1043d39484663cefcd86d4d9b-us21"
  }
  const request = https.request(url,options,function(response){
      if(response.statusCode === 200){
          res.sendFile("./success.html");
      }else{
          res.sendFile("./failure.html");
      }
      
  })
  request.write(jsonData);
  request.end();
});

app.post("/failure.html",function(req,res){ 
  res.redirect("./signup.html");
})

app.get("/",function(req,res){
  const options = {};
  res.render("home.ejs", options);
})

app.listen(3000, function() {
    console.log("Server is up and running at port 3000!");
})