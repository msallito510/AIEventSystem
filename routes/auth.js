var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function (req, res, next) {
    res.render('auth/login')
});
router.get('/signin', function (req, res, next) {
    res.render('auth/signin')
});
router.post('/login', function (req, res, next) {

    let { username, password } = req.body

    if (username == "" || password == "") {
        res.render('auth/login', { title: "This field cannot be empty" })
    } else {
        res.render('index', { title: username })
    }

});
router.post('/signin', function (req, res, next) {
    let { username, password, email } = req.body

    if (username == "" || password == "" || email == "") {
        res.render('auth/signin', { title: "This field cannot be empty" })
    } else {
        res.render('auth/login', { title: "Log In" })
    }

});
module.exports = router;
