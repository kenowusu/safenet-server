var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs   = require('fs');
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
const guestsRouter = require('./routes/guest');
let passwordsRouter = require('./routes/passwords');
let folderRouter    = require('./routes/folder');
let toolRouter  = require('./routes/tool');
const { send } = require('process');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/guests', guestsRouter);
app.use('/api/passwords',passwordsRouter);
app.use('/api/folders',folderRouter);
app.use('/api/tools',toolRouter);

// handle 404 errors
app.use(function(req, res, next) {
 res.status(404);
 return res.send({message:"resource not found",errcode:404})
  
});


//error handler 
app.use((err,req,res,next)=>{
  //error if in developement
  if(process.env.NODE_ENV === "development"){
    console.log(err.stack);
    
  }else{
    //save error to text file in production
    let writeError = fs.createWriteStream(path.join(__dirname,'logs','apperrlog.txt'));
    writeError.once('open',fd=>{
      writeError.write(`${new Date(Date.now()).toUTCString()}\n`);
      writeError.write(err.stack);
      writeError.end();

    })
  }

  //set respond status and end response
  res.status(err.status || 500);
  res.end();
});

module.exports = app;
