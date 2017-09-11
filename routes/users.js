var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

var users = "<div>repond with a resource </div>";
res.render('users', {
title: 'test',
 users: users
});
});

module.exports = router;

