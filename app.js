var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
var hbs = require('express-hbs');
/*
* Change handlebars extension for express
*/
app.engine('hbs', hbs.express4({
  partialsDir   : path.join(__dirname , '/views/partials'),//your path, views is a folder inside the source folder
  defaultLayout : path.join(__dirname ,'/views/layouts/master'), //set this one empty and provide your template below,
  extname       : '.hbs',
  layoutsDir    : path.join(__dirname ,'/views/layouts'),
}));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
