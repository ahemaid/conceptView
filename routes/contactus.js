var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  var contactus = "<div> Contact US </div>"
  res.render('contactus', {
  title: 'test',
   contactus: contactus
  });
  });

  module.exports = router;