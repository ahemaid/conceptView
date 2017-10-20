var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var contactus = require('./routes/contactus');
var users = require('./routes/users');
var tree = require('./routes/tree');
var visualization = require('./routes/visualization');
var turtleEditor = require('./routes/turtleEditor');
var config = require('./routes/config');
var fs = require('fs');
var  jsonfile  =  require('jsonfile')


//var selectServices = require('./routes/selectServices');

//var favicon = require('favicons');


var app = express();
//favicon
//app.use(favicon(__dirname + '/public/img/favicon.ico'));


/*var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';*/

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routing to the available routes on the app
app.use('/', routes);
app.use('/contactus', contactus);
app.use('/users', users);
app.use('/tree', tree);
app.use('/visualization', visualization);
app.use('/webvowlLink', express.static("views/webvowl"));
app.use('/turtleEditorLink', express.static("views/turtleEditor"));
app.use('/turtleEditor', turtleEditor);
app.use('/config', config);

// http post when  a user configurations is submitted
app.post('/config', function(req, res) {
  var timeout = null;
  var filepath = 'config.json';
  var emptyJSONFile = false;
  var userConfigurationsArray = [];
  // Read the userConfigurations file if exsit to append new data
  jsonfile.readFile(filepath, function(err, obj)  {
    if (err)
      console.log(err);  
    if (isEmptyObject(obj)) {
      emptyJSONFile = true;
    } else {
      if (obj.length > 0) {//push if there are array of objects
        for (var i = 0; i < obj.length; i++)
          userConfigurationsArray.push(obj[i]);
      }
      // push the current enterned object
      userConfigurationsArray.push(req.body);
      //used to write user configurations to the predefined file
      jsonfile.writeFile(filepath,  userConfigurationsArray,   {
        spaces:  2,
         EOL:   '\r\n'
      },  function(err)  {  
        if (err)
          throw err;
      })
    }
  })
  // for the first time if file is empty or not exsit
  var arrayForFirstTime =[];
  arrayForFirstTime.push(req.body);
  timeout = setTimeout(function() {
    if (emptyJSONFile) {
      jsonfile.writeFile(filepath,  arrayForFirstTime,   {
        spaces:  2,
         EOL:   '\r\n'
      },  function(err)  {  
        if (err)
          throw err;
        console.log("write");
      })
    }
  }, 3000);
  // redirect to another page
  res.render('userConfigurationsUpdated', {
    title: 'System is making ready'
  });
});

function isEmptyObject(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

//  catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(req.url);
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      title: 'error'
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    title: 'error'
  });
});


module.exports = app;
