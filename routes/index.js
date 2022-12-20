var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', {year: new Date().getFullYear()});
});

/* GET portfolio page. */
router.get('/portfolio/:page', function(req, res, next) {
    res.render('portfolio/' + req.params.page, {layout: false, year: new Date().getFullYear()});
});

module.exports = router;
