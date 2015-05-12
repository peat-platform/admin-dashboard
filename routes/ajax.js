var request = require('request');
var jwt     = require('jsonwebtoken');
var crud    = require('../libs/crud');
var config  = require('../libs/config');

var express = require('express');
var router  = express.Router();


router.get('/list_service_enablers', function(req, res)
{

   var view_url = "http://localhost:8092/clients/_design/clients_views/_view/list_service_enablers?inclusive_end=false&reduce=false&stale=update_after&connection_timeout=60000&limit=100&skip=0"

   crud.get(view_url, function(err, body){

      //console.log(">> ", err)
      //console.log(">> ", body)
      //console.log(">> ", body.length)

      if (undefined !== err && null !== err){

         res.setHeader('Content-Type', 'application/json');
         res.end({"error": err});
      }
      else{
         var body = JSON.parse(body)

         var se_list = []

         for (var i = 0; i < body.rows.length; i++){
            var se = body.rows[i]
            se_list.push({
               "name"        : se.value.name,
               "description" : se.value.description,
               "cloudlet"    : se.value.cloudlet
            })
         }

         res.setHeader('Content-Type', 'application/json');
         res.end(JSON.stringify(se_list));
      }

   })

});

module.exports = router;
