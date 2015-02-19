var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var session = require('express-session')

var request = require('request');
var ip = require('ip');

var crud = require('./libs/crud');
crud.base = 'https://' + ip.address() + ':443/api/v1/crud';

var auth = require('./libs/auth');
auth.base = 'https://' + ip.address() + ':443/api/v1/auth';

var index = require('./routes/index');

var register = require('./routes/register');
var login = require('./routes/login');
var logout = require('./routes/logout');

var authorize = require('./routes/authorize');
var deauthorize = require('./routes/deauthorize');
var registerClient = require('./routes/registerClient');

var apps = require('./routes/apps');
var cloudlets = require('./routes/cloudlets');
var search = require('./routes/search');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('4e3d00e7-7fc4-480f-b785-bafebbdcb74f'));

/*app.use(session({
  secret: '4e3d00e7-7fc4-480f-b785-bafebbdcb74f',
  //resave: false,
  //saveUninitialized: true,
  //rolling: true,
  //unset: 'destroy',
  cookie: { secure: true, maxAge: 3600000, foo: '' }
}))*/

app.use(express.static(path.join(__dirname, 'public')));

// Authentification check
app.use('/dashboard', function(req, res, next){
  if(req.signedCookies.session) {
    console.log('AuthCheck passed!');
    next();
  } else { 
    console.log('AuthCheck FAILED!');
    res.redirect('/');
  }
});

app.use('/', login);

//app.use('/users', users);

app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);

app.use('/dashboard', index);

app.use('/dashboard/authorize', authorize);
app.use('/dashboard/deauthorize', deauthorize);
app.use('/dashboard/registerClient', registerClient);

app.use('/dashboard/apps', apps);
app.use('/dashboard/cloudlets', cloudlets);
app.use('/dashboard/search', search);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
