var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
//  GET home page.
router.get('/', function(req, res) {
  router.use(bodyParser.urlencoded({
    extended: false
  }));


  // GET home page.
  res.render('config', {
    title: 'Configuration Page'
  });
});

module.exports = router;
