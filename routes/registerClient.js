var request = require('request');
var auth    = require('../libs/auth');
var express = require('express');
var jwt     = require('jsonwebtoken');
var config  = require('../libs/config');
var router  = express.Router();

router.get('/', function(req, res){
   jwt.verify(req.signedCookies.session, config.key.verify, function (err, decoded) {

      if (err) {
         res.render('/admin/login')
      }
      else {
         res.render('registerClient', {user : decoded.user_id});
      }
   });
});

router.post('/', function(req, res)
{
   jwt.verify(req.signedCookies.session, config.key.verify, function (err, decoded) {

      if (err) {
         res.render('/admin/login')
      }
      else {
         console.log(">>> 1")
         console.log(">>>  ", req.body)
         if(!req.body.clientname || !req.body.cdescription) {
            console.log(">>> 2")
            // pass a local variable to the view
            res.render('registerClient', { message: 'Please insert any client name and description before.' }, function(err, html) {
               console.log(">>> 3")
               res.send(html);
            });
            return;
         }
         auth.createClient(req.body.clientname, req.body.cdescription, req.signedCookies.session, function(err, body) {
            console.log(">>> 4")
            res.redirect('apps');
         });
      }
   });
});

module.exports = router;
