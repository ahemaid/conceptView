var express = require('express');
var router = express.Router();
var homedir = "/home/ahmed/Desktop/dev/JS/expSample/routes/data";
var fs = require('fs');
var files = fs.readdirSync(homedir);
var path = require('path');

 GET Menus list. 
router.get('/', function(req, res) {

  var selectServices = "<div class='col-sm-6'>"+
                                    "<div class='checkbox'>"+
                                        "<label><input name='food' type='checkbox' value='dairy'>Dairy</label>"+
                                    "</div><div class='checkbox'>"+
                                      "  <label><input name='food' type='checkbox' value='meat'>Meat</label></div>"+
                                    "<div class='checkbox'>"+
                                        "<label><input name='food' type='checkbox' value='fish'>Fish</label></div></div>";
     


res.render('selectServices', {
title: 'test',
 selectServices: selectServices
});
});

module.exports = router;
