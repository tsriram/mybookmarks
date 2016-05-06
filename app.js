var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var bookmarks = require('./routes/bookmarks');
var folders = require('./routes/folders');

var app = express();

var db = require('./src/db').connect('mongodb://localhost:27017/mybookmarks');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// add db to req
app.use(function(req, res, next){
  req.db = db;
  return next();
});

// Validate required fields
app.use(function(req, res, next) {
  req.validateRequiredFields = function validateRequiredFields(fields, obj) {
    obj = obj || req.body;
    fields.forEach(function(field) {
      if (typeof obj[field] === 'undefined') {
        var error = new Error("Required field " + field + " missing");
        error.status = 400;
        throw error;
      }
    });
  };
  return next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/bookmarks', bookmarks);
app.use('/folders', folders);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  err.status = err.status || 500;
  res.status(err.status);
  res.json({
    status: 'error',
    code: err.status,
    error: err.message || err.toString()
  });
});


module.exports = app;
