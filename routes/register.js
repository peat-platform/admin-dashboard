var request = require('request');
var auth = require('../libs/auth');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res)
{
  console.log('\nGET REGISTER PAGE!\n');
  res.render('register');
});

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
      console.error(err);
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
});

module.exports = router;
