var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var stylus = require('stylus');

var captiveRouter = require('./routes/captive');
var indexRouter = require('./routes/index');
var menuRouter = require('./routes/menu');
var feedRouter = require('./routes/feed');
var frecuentesRouter = require('./routes/frecuentes');
var covidRouter = require('./routes/covid');
var ggj21Router = require('./routes/ggj21');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/captive', captiveRouter);
app.use('/menu', menuRouter);
app.use('/feed', feedRouter);
app.use('/frecuentes', frecuentesRouter);
app.use('/covid-19', covidRouter);
app.use('/ggj21', ggj21Router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
