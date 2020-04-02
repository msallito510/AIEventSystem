var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Event = require("../models/events");

router.use("/", function (req, res, next) {
  if (req.cookies["datauser"]) {
    let datausr = req.cookies["datauser"];
    let name = datausr.username;
    Event.distinct('tags').then((datatag) => {


      return datatag;
    }).then((datatag) => {


      Event.distinct('location').then((data) => {

        return data;

      }).then((data) => {

        res.render("finder/main", { title: name, data: data, datatag: datatag });


      })


    })


    next();
  } else {
    res.redirect("/login");
  }
});

router.get("events", function (req, res, next) {
  let datausr = req.cookies["datauser"];
  let name = datausr.username;
  Event.find({ admin: name }).then(persodata => {
    Event.find({}).then(data => {
      res.render("finder/main", { data: data });
    });
  });
});

router.get("/", function (req, res, next) {
  let datausr = req.cookies["datauser"];
  let name = datausr.username;
  Event.distinct("tags")
    .then(datatag => {
      return datatag;
    })
    .then(datatag => {
      Event.distinct("location")
        .then(data => {
          return data;
        })
        .then(data => {
          res.render("finder/main", {
            data: data,
            datatag: datatag,
            title: name
          });
        });
    });
});

router.post("/result", function (req, res, next) {
  let location = req.body.city;
  if (location) {
    Event.find({ location: location })
      .then(data => {
        res.render("events/eventshow", { data: data });
      })
      .catch(() => {
        res.render("finder/main", { data: data, title: name });
      });
  }

});

router.post('/tagresult', function (req, res, next) {
  let { tag } = req.body;

  if (tag) {
    Event.find({ tags: tag })
      .then(data => {
        res.render("events/eventshow", { data: data });
      })
      .catch(() => {
        res.render("finder/main", { data: data, title: name });
      });
  }
})

module.exports = router;
