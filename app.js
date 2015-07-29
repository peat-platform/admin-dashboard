var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var engines      = require('consolidate');

var config = {
   trusted_public_key: "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnSRTD69QF3icNd6u7Pm4\nWO966/b6xxqbkhZgckvxmEQIsPSzGttAqr3PrznPGopvxMLAyEgcwQ8Bdbz7Jwei\nbyZPLn8s4XyNaZK2mA1pz5lV9B+QjoFYgqdlQPxj/VBMT7w3nOdqAHWC/evm0Ork\naDznvebbK2viGEONfl2t1oUqtaAnS+DHXG2vihvfFIRAUXLmIpOcTSC4zgK1y0Wj\n2mAG6OQWGVgKEyczByZqYrIScFnoebzTQXTmWjJp/eHjIag4q5zdPuXGR3w1hHeO\n+kK+mTyS5CkAVRYUooIH5nTGLvXG70KBeCAOgNNG27944frIbmvKyb6ZxbLLR2iA\nnwIDAQAB\n-----END PUBLIC KEY-----"
};

var wrap = function(args) {

   /*****************************
    *       IMPLEMENT ROUTES     *
    *****************************/
// Overview Dashboard
   if (args.auth_server_public_key == undefined){
      args.auth_server_public_key = config.trusted_public_key
   }



   /*****************************
    *        INITIALIZE APP      *
    *****************************/
   var app = express();

   var routes = require('./routes/routes')(args);

// view engine setup
   app.set('views', path.join(__dirname, 'views'));
//app.engine('jade', require('jade').__express);
//app.engine('html', require('ejs').renderFile);
//
//app.engine('haml', engines.haml);
//app.engine('html', engines.hogan);
   app.set('view engine', 'jade');

   //app.engine('.ejs', require('ejs').renderFile);

//app.set('view engine', 'ejs');

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
   app.use('/admin', function (req, res, next) {
      if ( req.signedCookies.session || req.path === '/login' || req.path === '/register' || req.path === '/logout' ) {
         next();
      }
      else {
         res.redirect('/admin/login');
      }
   });

   app.use('/admin', routes);


// catch 404 and forward to error handler
   app.use(function (req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
   });

// error handlers

// development error handler
// will print stacktrace
   if ( app.get('env') === 'development' ) {
      app.use(function (err, req, res, next) {
         res.status(err.status || 500);
         res.render('error', {
            message: err.message,
            error  : err
         });
      });
   }

// production error handler
// no stacktraces leaked to user
   app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
         message: err.message,
         error  : {}
      });
   });

   return app
};

module.exports = wrap;
