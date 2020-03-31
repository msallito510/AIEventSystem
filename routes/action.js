var express = require('express');
var router = express.Router();
const User = require("../models/user");
const Event = require("../models/events");
/* GET users listing. */
router.post('/upload', function (req, res, next) {
    res.render('action/upload');
});

module.exports = router;
