/**
 * Created by dmccarthy on 09/03/15.
 */
var request = require('request');
var crud    = require('../libs/crud');
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
         crud.readUserCloudlets(req.signedCookies.session, function(err, body){
            var cids = []

            var body = JSON.parse(body)

            for (var i = 0; i < body.result.length; i++ ){
               var entry = body.result[i]
               if (entry[0] !== entry[1]){
                  cids.push(entry[1])
               }
            }

            res.render('data_dashboard', {
               'user'      : decoded.user_id,
               'session'   : req.signedCookies.session,
               'cloudlets' : cids
            });
         });
      }
   });
});


module.exports = router;