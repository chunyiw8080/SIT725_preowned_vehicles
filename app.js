var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const mongoStore = require('connect-mongo');

const {dbHost, dbPort, dbName, secret} = require('./config/config');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var valuationRouter = require('./routes/valuation');
var postRouter = require('./routes/posts');
var editorRouter = require('./routes/editor');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

//session configuration
app.use(session({
  name: 'sid', 
  secret: `${secret}`, 
  saveUninitialized: false, 
  resave: true, 
  store: mongoStore.create({mongoUrl: `mongodb://${dbHost}:${dbPort}/${dbName}`}),
  cookie: {httpOnly: true, maxAge: 1000 * 60 * 60} 
}));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/valuation', valuationRouter);
app.use('/posts', postRouter);
app.use('/editor', editorRouter);

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
  res.send('error');
});

module.exports = app;
