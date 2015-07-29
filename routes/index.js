var express = require('express');
var jwt     = require('jsonwebtoken')

module.exports = function(config) {

   var router = express.Router();

   /* GET home page. */
   router.get('/', function (req, res) {

      config.auth_server_public_key = config.auth_server_public_key.replace(/'/g, "").replace(/"/g, '').replace(/\\n/g, "\n")


      jwt.verify(req.signedCookies.session, config.auth_server_public_key, function (err, decoded) {

         if (err) {
            res.render('login')
         }
         else {
            res.render('index', {
               title    : 'PEAT Admin Dashboard',
               ContentHeader  : decoded.user_id.toUpperCase()+'\'s Home',
               token    : req.signedCookies.session.substring(0, 100) + "...",
               user     : decoded.user_id,
               cloudlet : decoded.cloudlet
            });
         }
      });

   });

   return router
}
