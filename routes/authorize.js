var request = require('request');
var auth = require('../libs/auth');
var express = require('express');
var router = express.Router();

router.post('/', function(req, res)
{
  if(!req.signedCookies.session)
  {
    res.redirect('/');
    return;
  }
  
  auth.createAuthorization(req.body.username, req.body.password, req.signedCookie.api_key, req.signedCookie.secret, function(err, body)
  {
    if(err)
    {
      console.error(err);
      res.redirect(400,'/');
      return;
    }
    console.log(body);
    body = JSON.parse(body);
    res.cookie('clientSession', body.session , {maxAge: 1800000/* 30min */, httpOnly: true, path: '/dashboard', signed: true});
    res.render('authorize');
  });
});

module.exports = router;
