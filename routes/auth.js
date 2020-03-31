var express = require("express");
var router = express.Router();

const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const User = require("../models/user");

router.get("/login", function(req, res, next) {
  res.render("auth/login");
});
router.get("/signin", function(req, res, next) {
  res.render("auth/signin");
});
router.post("/login", function(req, res, next) {
  let { username, password } = req.body;

  if (username == "" || password == "") {
    res.render("auth/login", { title: "This field cannot be empty" });
  } else {
    User.findOne({ username: username, hashedPassword: password }).then(
      datausertoenter => {
        if (datausertoenter) {
          res.cookie("datauser", datausertoenter, {
            maxAge: 900000,
            httpOnly: true
          });
          res.redirect("/");
        } else {
          res.render("auth/login", { title: "Sorry, try again" });
        }
      }
    );
  }
});
router.post("/signin", function(req, res, next) {
  let { username, password, email } = req.body;

  if (username == "" || password == "") {
    res.render("auth/signin", { title: "This field cannot be empty" });
  } else {
    User.findOne({ username: username }).then(userdata => {
      if (userdata) {
        res.render("auth/signin", { title: "User exist, try again" });
      } else {
        User.insertMany({
          username: username,
          hashedPassword: password,
          email: email,
          selfie: "none.png"
        }).then(datalog => {
          console.log(datalog);
          res.render("auth/login", { title: "Success, now login please" });
        });
      }
    });
  }
});
router.get("/out", function(req, res, next) {
  res.clearCookie("datauser");
  res.redirect("/");
});
module.exports = router;
