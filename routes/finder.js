var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Event = require("../models/events");
router.use('/', function (req, res, next) {
    if (req.cookies["datauser"]) {
        let datausr = req.cookies["datauser"];
        let name = datausr.username;

        next()
    } else {
        res.redirect("/login");
    }
})


router.get("/", function (req, res, next) {

    Event.distinct('location').then((data) => {


        return data

    }).then((data) => {

        res.render("finder/main", { data: data });


    })
});

router.get("/result/:location", function (req, res, next) {
    let location = req.params.location

    Event.find({ location: location }).then(data => {
        res.render("events/eventshow", { data: data });
    });

});
module.exports = router;
