var request = require('request');
var auth = require('../libs/auth');
var express = require('express');
var router = express.Router();

router.post('/', function(req, res)
{
  if(!req.body.username || !req.body.password)
  {
    res.redirect('/');
    //res.send('respond with a resource');
    return;
  }
  
  auth.createUser(req.body.username, req.body.password, function(err, body)
  {
    if(err)
    {
      res.redirect('/');
      return;
    }

    auth.createSession(req.body.username, req.body.password, function(err, body)
    {
      if(err)
      {
        res.redirect('/');
        return;
      }
      res.cookie('session', body.session, {signed: true});
      res.redirect('/');
    });
  });
});

module.exports = router;
