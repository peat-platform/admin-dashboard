var request = require('request');
var auth = require('../libs/auth');
var express = require('express');
var router = express.Router();

// GET route to get the register site
router.get('/', function(req, res)
{
  res.render('register');
});

// POST route to register
router.post('/', function(req, res)
{
  if(!req.body.username || !req.body.password)
  {
    res.redirect(400,'/');
    //res.send('respond with a resource');
    return;
  }
  
  auth.createUser(req.body.username, req.body.password, function(err, body)
  {
    if(err)
    {
       if (err == "Error creating entity: exists"){
          err = "A user with that username already exists, please try another."
       }
      res.render('register', {'error' : err });
      return;
    }

    auth.createSession(req.body.username, req.body.password, function(err, body)
    {
      if(err)
      {
         res.render('register', {'error' : err });
        return;
      }
      res.cookie('session', body.session, {maxAge: 1800000/* 30min */, httpOnly: true, path: '/admin', signed: true});
      res.redirect('/admin');
    });
  });
});

module.exports = router;
