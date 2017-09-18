var express = require('express');
var router = express.Router();
var app = express();


//  GET home page. 
//app.get('/', function (req, res) {

router.get('/', function (req, res) {

    var url = req.url;
    console.log(url);

    var template = '<a href="http://localhost:3000/">YourURL is ' + ur + '. </a>';

    return res.send(template);
    // GET home page. 
    /* res.render('index', {
         title: 'MobiVoc',
         concept: url
     });*/
});

module.exports = router;
