var express = require('express');
var router = express.Router();
//  GET home page.
router.get('/', function (req, res) {
    // GET home page.
    res.render('index', {
         title: 'MobiVoc',
     });
});

module.exports = router;
