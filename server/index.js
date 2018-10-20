var express = require("express");
var bodyParser = require("body-parser");
var database = require("../database/index.js");
var cors = require("cors");
var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + "/../public"));

app.get("/sources", function(req, res) {
  database.selectAll(function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get("/resources", function(req, res) {
  database.displayResources(function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get("/about", function(req, res) {
  database.displayTeamMembers(function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});
app.post("/learnMore", function(req, res) {
  let name = req.body.name;
  let gender = req.body.gender;
  let lived = req.body.lived;
  let currlocation = req.body.currlocation;
  let age = req.body.age !== undefined ? parseInt(req.body.age) : 1;
  if (!name) {
    res.sendStatus(400);
  } else {
    database.insertInfo(
      name,
      gender,
      lived,
      currlocation,
      age,
      (err, results) => {
        if (err) {
          res.sendStatus(500);
        } else {
          res.json(results);
        }
      }
    );
  }
});

app.listen(5000, function() {
  console.log("listening on port 5000!");
});
