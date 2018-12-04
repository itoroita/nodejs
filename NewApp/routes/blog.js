var express = require('express');
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
var ObjectId = require("mongodb").ObjectId;
const dbName = "blog_db";
let db;



// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  console.log("Connection Success");

  db = client.db(dbName);

});

/* GET home page. */

router.get("/all", function(req, res, next) {
  db.collection("article").find({}).toArray(function(err, result) {
      console.log(err, result)
      res.send(result);
    });
});

router.post("/create", function(req, res, next) {
  db.collection("article").insert(req.body, function(err, result) {
    console.log(err, result)
    res.send(result);
  });
});

router.get("/read", function(req, res, next) {
  db.collection("article").find({ "_id": blogId("5c6dc1011384d2e610ba5edef")}).toArray(function(err, result) {
    console.log("Find the following records");
    console.log(result)
      res.send(result);
    });
});

router.post("/signup", function(req, res, next) {
  db.collection("users").insert(req:body, function(err, result) {
  	  console.log(err, result)
      res.send(result);
    });
});



router.post("/auth/login", function(req, res, next) {
    var post = req.body;
    if(post.email === 'itoroita1@gmail.com' && post.password === '1234'){
      res.send("Authentication success");
    } else {
      res.send("Invalid login");
    }
});


router.put("/update", function(req, res, next) {
  db.collection("article").update({ _id: objectId(req.body._id)}, { $set:{
     title: req.body.title,
     author: req.body.author,
     content: req.body.content}}, (function(err, result){
       console.log("Record update!")
       console.log(result);
       res.send(result);
  }));
});

router.delete("/delete:id", function(req, res, next) {
  db.collection("article").remove({ _id: ObjectId(req.body._id) }, function(err, result) {
    console.log(err, result)
    res.send(result);
  });
});
module.exports = router;
