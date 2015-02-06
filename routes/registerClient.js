var request = require('request');
var auth = require('../libs/auth');
var express = require('express');
var router = express.Router();

router.post('/', function(req, res)
{
  if(!req.body.client || !req.body.secret)
  {
    res.redirect('/');
    return;
  }
  console.log(req.body);
  auth.createClient(req.body.client, req.body.secret, function(err, body)
  {
    res.redirect('/');
  });
});

module.exports = router;
