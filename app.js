var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
//var vocab = require('./routes/vocab');
var contactus = require('./routes/contactus');
var users = require('./routes/users');
var tree = require('./routes/tree');
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


//app.use('jQuery', express.static(__dirname + '/node_modules/jquery/dist/'));

var data = require('./results.json');

// TO:DO check if the file's expetions
function SortByName(x, y) {
    return ((x.concept.toLowerCase() == y.concept.toLowerCase()) ? 0 : ((x.concept.toLowerCase() > y.concept.toLowerCase()) ? 1 : -1));
}

function uniqurArray(array) {
    var out = [];
    var sl = array;

    for (var i = 0, l = sl.length; i < l; i++) {
        var unique = true;
        for (var j = 0, k = out.length; j < k; j++) {
            if (sl[i].concept.toLowerCase() === out[j].concept.toLowerCase()) {
                unique = false;
            }
        }
        if (unique) {
            out.push(sl[i]);
        }
    }

    return out;
}

// Call Sort By Name
data.sort(SortByName);
app.locals.appdata = uniqurArray(data);
//console.log(app.locals.appdata);
app.use('/', routes);

app.use('/contactus', contactus);
app.use('/users', users);
app.use('/tree', tree);
//app.use('/selectServices', selectServices);
app.use('/visualization1', express.static('views/webvowl'));


//  catch 404 and forward to error handler
app.use(function (req, res, next) {
    console.log(req.url);
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
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
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});


module.exports = app;
