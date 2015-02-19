var request = require('request');
var jwt = require('jsonwebtoken');
var auth = require('../libs/auth');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res)
{
  console.log('\nGET LOGIN PAGE!\n');
  res.render('login');

  /*var client = require("swagger-client")

  var swagger = new client.SwaggerClient({
    url: 'https://demo2.openi-ict.eu/api-spec/v1/simple_auth.json',
    success: function() {
      console.log( swagger.apis() );
    }
  });*/

});

router.post('/', function(req, res)
{
  if(!req.body.username || !req.body.password)
  {
    res.redirect('/');
    return;
  }
  
  auth.createSession(req.body.username, req.body.password, function(err, body)
  {
    if(err)
    {
      console.error(err);
      res.redirect('/');
      return;
    }
    res.cookie('session', body.session, {signed: true});
    res.redirect('/dashboard');
  });
});

module.exports = router;
