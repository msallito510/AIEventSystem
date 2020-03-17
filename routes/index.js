var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  if (req.cookies["datauser"]) {
    let datausr = req.cookies["datauser"];
    let name = datausr.username;
    res.render("index", { title: name });
  } else {
    res.render("index");
  }
});

module.exports = router;
