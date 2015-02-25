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
      res.clearCookie('session', {maxAge: 1800000/* 30min */, httpOnly: true, path: '/dashboard', signed: true});
      res.clearCookie('api_key', {maxAge: 1800000/* 30min */, httpOnly: true, path: '/dashboard', signed: true});
      res.clearCookie('cloudlet', {maxAge: 1800000/* 30min */, httpOnly: true, path: '/dashboard', signed: true});
      res.clearCookie('cloudletID', {maxAge: 1800000/* 30min */, httpOnly: true, path: '/dashboard', signed: true});
      res.clearCookie('secret', {maxAge: 1800000/* 30min */, httpOnly: true, path: '/dashboard', signed: true});
      res.redirect('/');
      return;
    }
    res.clearCookie('session', {maxAge: 1800000/* 30min */, httpOnly: true, path: '/dashboard', signed: true});
    res.clearCookie('api_key', {maxAge: 1800000/* 30min */, httpOnly: true, path: '/dashboard', signed: true});
    res.clearCookie('cloudlet', {maxAge: 1800000/* 30min */, httpOnly: true, path: '/dashboard', signed: true});
    res.clearCookie('cloudletID', {maxAge: 1800000/* 30min */, httpOnly: true, path: '/dashboard', signed: true});
    res.clearCookie('secret', {maxAge: 1800000/* 30min */, httpOnly: true, path: '/dashboard', signed: true});
    res.redirect('/');
  });
});

module.exports = router;
