var express = require('express');
var router = express.Router();
require("dotenv").config();



// Set your AWS credentials




router.post('/upload', function (req, res, next) {

    res.render('action/upload');
});

module.exports = router;