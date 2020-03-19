var express = require('express');
var router = express.Router();

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

router.get('/', function (req, res, next) {
    let datausr = req.cookies["datauser"];
    let name = datausr.username;
    res.render('profile/profile', { name: name });
});

module.exports = router;
