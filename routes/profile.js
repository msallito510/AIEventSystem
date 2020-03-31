var express = require('express');
var router = express.Router();
var multer = require('multer');
const User = require("../models/user");
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

router.get('/:nombre/', function (req, res, next) {
    let nombre = req.params.nombre

    let ErrorExistente = req.query.valid;
    let datausr = req.cookies["datauser"];
    let name = datausr.username;
    User.findOne({ username: nombre }).then((datauser) => {
        if (nombre == name) {
            Event.find({ admin: nombre }).then(persodata => {
                Event.find({}).then(data => {

                    res.render('profile/profile', { error: ErrorExistente, datauser: datauser, data: data, persodata: persodata, isAdmin: true });

                });
            });
        } else {
            Event.find({ admin: nombre }).then(persodata => {
                Event.find({}).then(data => {

                    res.render('profile/profile', { error: ErrorExistente, data: data, persodata: persodata, isAdmin: false });

                });
            });


        }


    })
});
router.post('/edituser', function (req, res, next) {
    let datausr = req.cookies["datauser"];
    let id = datausr.id;
    let { name, nametoedit } = req.body;

    User.findOne({ username: name }).then((checkuserdata) => {
        if (checkuserdata) {
            console.log(checkuserdata)
            errroExists = encodeURIComponent('This username in not available');
            res.redirect('/profile/' + nametoedit + '/?valid=' + errroExists)
        } else if (name != "") {
            User.findOneAndUpdate({ username: nametoedit }, { username: name })
                .then(results => {
                    console.log(name, nametoedit)
                    res.clearCookie("datauser");
                    res.redirect("/");
                }).catch(err => {
                    console.error("Something went wrong", err);
                })
        } else if (name == "") {
            errroEmpty = encodeURIComponent('This username field is empty');
            res.redirect('/profile/' + nametoedit + '/?valid=' + errroEmpty)
        }
    })
})

router.post('/editpass', function (req, res, next) {
    let datausr = req.cookies["datauser"];
    let id = datausr.id;
    let { nametoedit, pass, pass2 } = req.body;

    User.findOne({ username: nametoedit }).then((checkuserdata) => {

        if (pass != "" || pass2 != "") {
            if (pass != pass2 || pass2 != pass) {
                errorMatch = encodeURIComponent('Password not match');
                res.redirect('/profile/' + nametoedit + '/?valid=' + errorMatch)
            } else {



                User.findOneAndUpdate({ username: nametoedit }, { hashedPassword: pass })
                    .then(results => {
                        console.log()
                        res.clearCookie("datauser");
                        res.redirect("/");
                    }).catch(err => {
                        console.error("Something went wrong", err);
                    })

            }
        } else if (pass == "" || pass2 == "") {
            errroEmpty = encodeURIComponent('Password field is empty');
            res.redirect('/profile/' + nametoedit + '/?valid=' + errroEmpty)
        }
    })
})


module.exports = router;
