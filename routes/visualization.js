var express = require('express');
var router = express.Router();
var app = express();
/* GET users listing. */
router.get('/', function (req, res) {
    //app.use('/visualization', express.static('../views/webvowl'));
    //res.send('respond with a resource');
    //res.redirect('../views/webvowl/');

       res.render('visualization', {
            title: 'visualization',
        });
});

module.exports = router;
