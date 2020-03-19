var express = require("express");
var router = express.Router();
const Event = require("../models/events");

/* GET home page. */
router.get("/", function(req, res, next) {
  if (req.cookies["datauser"]) {
    let datausr = req.cookies["datauser"];
    let name = datausr.username;
    Event.find({}).then(data => {
      res.render("index", { data: data, title: name });
    });
  } else {
    Event.find({}).then(data => {
      res.render("landing", { data: data });
    });
  }
});

module.exports = router;
