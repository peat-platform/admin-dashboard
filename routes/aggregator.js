/**
 * Created by dconway on 27/03/15.
 */

var request  = require('request');
var jwt      = require('jsonwebtoken');
var crud     = require('../libs/crud');
var auth     = require('../libs/auth');
var subs     = require('../libs/subscriptions')
var config   = require('../libs/config');


var express = require('express');
var router  = express.Router();

module.exports = function (cmd_args) {

   var admin_dash_public_key = cmd_args.auth_server_public_key.replace(/'/g, "").replace(/"/g, '').replace(/\\n/g, "\n");

   return function (req, res, next) {

      jwt.verify(req.signedCookies.session, admin_dash_public_key, function (err, decoded) {

         if ( err ) {
            res.render('/admin/login')
         }
         else {
            res.render('aggregator', {
               user     : decoded.user_id,
               'session': req.signedCookies.session
            });
         }
      });


   };
};
