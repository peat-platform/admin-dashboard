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
  
  auth.deleteSession(req.signedCookies.session, function(err, body)
  {
    if(err)
    {
      res.redirect('/');
      return;
    }
    res.clearCookie('session');
    res.redirect('/');
  });
});

module.exports = router;
