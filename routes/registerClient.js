var request = require('request');
var auth = require('../libs/auth');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render('registerClient');
});

router.post('/', function(req, res)
{
  if(!req.body.clientname || !req.body.cdescription)
  {
    res.redirect('/');
    return;
  }
  console.log(req.body);
  auth.createClient(req.body.clientname, req.body.cdescription, req.signedCookies.session, function(err, body)
  {
    res.cookie('cloudlet', body.cloudlet, {signed: true});
    res.cookie('api_key', body.api_key, {signed: true});
    res.cookie('secret', body.secret, {signed: true});
    res.redirect('/dashboard');
  });
});

module.exports = router;
