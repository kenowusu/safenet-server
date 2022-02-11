var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors   = require('cors');
const {corsOptions} = require('./options');




//require .env
require('dotenv').config();

//database connection
const sequelize = require('./database/config');


// require models
const userModel = require('./database/models/user')
const passwordModel = require('./database/models/password');
const CustomFieldModle = require('./database/models/customfield');
const folderModel  = require('./database/models/folder');
const noteModel   = require('./database/models/note');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let passwordsRouter = require('./routes/passwords');
let folderRouter    = require('./routes/folder');
let toolRouter  = require('./routes/tool');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


console.log(corsOptions.origin)

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/passwords',passwordsRouter);
app.use('/api/folders',folderRouter);
app.use('/api/tools',toolRouter);

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
