var request = require('request');
var auth = require('../libs/auth');
var express = require('express');
var router = express.Router();

router.post('/', function(req, res)
{
  if(!req.signedCookies.session)
  {
    res.redirect('/apps');
    return;
  }
  
  auth.createAuthorization(req.signedCookies.session, req.body.client, function(err, body)
  {
    res.redirect('/apps');
  });
});

module.exports = router;
