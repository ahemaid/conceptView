var express = require('express');
var router = express.Router();
//
/* GET Menus list. */
router.get('/', function(req, res) {

  var menus = '<ul class="dropdown-menu" id="2"><li class="current"><a href="http://localhost:3000/">Home</a></li><li><a/ href="http://localhost:3000/users">Users</a></li><li><a href="http://localhost:3000/visualization1">Visualization</a></li><li ><a/ href="http://localhost:3000/contactus">Contact Us</a></li></ul>';
res.render('menus', {
title: 'test',
 menus: menus
});
});
//
//to hide a tab od the menus use: class="hide"
module.exports = router;
