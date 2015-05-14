var request  = require('request');
var jwt      = require('jsonwebtoken');
var crud     = require('../libs/crud');
var auth     = require('../libs/auth');
var subs     = require('../libs/subscriptions');
var config   = require('../libs/config');


var express = require('express');
var router  = express.Router();

var apiKeyExtract = new RegExp(/[a-z,0-9]{32}/m);

router.get('/', function(req, res)
{
   //console.log("req", req.signedCookies.session)

   jwt.verify(req.signedCookies.session, config.key.verify, function (err, decoded) {

      if (err) {
         res.render('/admin/login')
      }
      else {

         subs.getSubscriptions(req.signedCookies.session, function(err, body)
         {
            if (err) {
               console.log(err)
            }
            if(body !== undefined || body !== null){
               res.render('subscriptions', {user : decoded.user_id,
                  's': body,
                  'session' : req.signedCookies.session});
            }
            else{
               res.render('subscriptions', {user : decoded.user_id,
                  's':[],
                  'session' : req.signedCookies.session});
            }

         });
      }
   });


});


module.exports = router;
