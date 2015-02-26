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
    // pass a local variable to the view
    res.render('registerClient', { message: 'Please insert any client name and description before.' }, function(err, html) {
      res.send(html);
    });
    return;
  }
  auth.createClient(req.body.clientname, req.body.cdescription, req.signedCookies.session, function(err, body)
  {
    res.redirect('apps');
  });
});

module.exports = router;
