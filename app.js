var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs')
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

//development only
mongoose.connect('mongodb://localhost/map-app')


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

// mongoose.model('users', {id: Number, name: String});

fs.readdirSync(__dirname + '/models').forEach(function(filename){
  if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});


// Routes for get requests to MongoDB, using Mongoose
app.get('/users', function(req, res) {
  mongoose.model('users').find(function(err, users) {
    res.send(users);
  });
});

app.get('/users/:userId', function(req, res) {
  mongoose.model('users').find({ id: req.params.userId }, function(err, users) {
    res.send(users);
  });
});

// Get request for Pins:
app.get('/pins', function(req, res) {
  mongoose.model('pins').find(function(err, pins) {
    res.send(pins);
  });
});

// Routes:
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
