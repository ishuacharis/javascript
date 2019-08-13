var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var expressVal = require('express-validator');
var expressSess = require('express-session');
const passport = require('passport')
require('./config/passport');
var app = express();

 

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var userRouter = require('./routes/user');
var usersRouter = require('./routes/users')
// var authRouter = require('./routes/authentication')
 

app.use(require('./logger/logger')('dev'))
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(expressVal());
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'))
app.use(expressSess({
  secret: 'wale',
  saveUninitialized: true,
  resave: true
}));

app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});
//app.use(passport.initialize())

app.use('/', indexRouter);
app.use('/login', loginRouter);
// app.use('/login', authRouter)
app.use('/register', registerRouter);
app.use('/user', passport.authenticate('jwt', {
  session: false
}), userRouter);
app.use('/users',  usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err});
});



module.exports = app;
