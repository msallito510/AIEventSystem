var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Event = require("../models/events");

router.use("/", function(req, res, next) {
  if (req.cookies["datauser"]) {
    let datausr = req.cookies["datauser"];
    let name = datausr.username;

    next();
  } else {
    res.redirect("/login");
  }
});

router.get("/", function(req, res, next) {
  let datausr = req.cookies["datauser"];
  let name = datausr.username;
  Event.find({ admin: name }).then(persodata => {
    Event.find({}).then(data => {
      res.render("events/eventshow", { data: data, persodata: persodata });
    });
  });
});

router.get("/add", function(req, res, next) {
  res.render("events/eventadd");
});

router.post("/add", function(req, res, next) {
  let datausr = req.cookies["datauser"];
  let admin = datausr.username;
  const {
    name,
    description,
    location,
    provincia,
    datefrom,
    dateto,
    timefrom,
    timeto,
    price
  } = req.body;

  if (name == "" || description == "" || location == "") {
    res.render("events/eventadd", { error: "Empty" });
  } else {
    Event.insertMany({
      name: name,
      description: description,
      location: location,
      provincia: provincia,
      dateInit: datefrom,
      dateEnd: dateto,
      timeInit: timefrom,
      timeEnd: timeto,
      price: price,
      admin: admin
    });
    res.redirect("/events");
  }
});

router.get("/edit/:id/", function(req, res, next) {
  let id = req.params.id;
  Event.findOne({ _id: id }).then(data => {
    res.render("events/eventedit", { data: data });
  });
});

router.post("/edit", function(req, res, next) {
  const {
    name,
    description,
    location,
    id,
    datefrom,
    dateto,
    timefrom,
    timeto,
    price
  } = req.body;

  if (name == "" || description == "" || location == "") {
    res.render("events/eventedit", { error: "Empty" });
  } else {
    Event.findByIdAndUpdate(
      { _id: id },
      {
        name: name,
        description: description,
        location: location,
        dateInit: datefrom,
        dateEnd: dateto,
        timeInit: timefrom,
        timeEnd: timeto,
        price: price
      }
    ).then(data => {
      console.log(data);
      res.redirect("/events");
    });
  }
});

router.get("/view/:id/", function(req, res, next) {
  let id = req.params.id;
  let datausr = req.cookies["datauser"];
  let usernow = datausr.username;

  Event.findOne({ _id: id }).then(data => {
    res.render("events/eventview", { data: data });
  });
});

router.post("/remove/:id/", function(req, res, next) {
  let id = req.params.id;
  Event.findByIdAndRemove({ _id: id }).then(data => {
    res.redirect("/events");
  });
});

module.exports = router;
