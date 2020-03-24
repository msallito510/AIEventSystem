var express = require('express');
var router = express.Router();
const User = require("../models/user");
const Event = require("../models/events");

/* GET users listing. */

router.use('/', function (req, res, next) {
    if (req.cookies["datauser"]) {
        let datausr = req.cookies["datauser"];
        let name = datausr.username;

        next()
    } else {
        res.redirect("/login");
    }
})

router.get('/:nombre/', function (req, res, next) {
    let nombre = req.params.nombre
    let datausr = req.cookies["datauser"];
    let name = datausr.username;
    User.findOne({ username: nombre }).then((data) => {
        if (nombre == name) {
            Event.find({ admin: nombre }).then(persodata => {
                Event.find({}).then(data => {

                    res.render('profile/profile', { data: data, persodata: persodata, isAdmin: true });

                });
            });
        } else {
            Event.find({ admin: nombre }).then(persodata => {
                Event.find({}).then(data => {

                    res.render('profile/profile', { data: data, persodata: persodata, isAdmin: false });

                });
            });


        }


    })
});

module.exports = router;
