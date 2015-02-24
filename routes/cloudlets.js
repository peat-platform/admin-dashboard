var request = require('request');
var cloudlets = require('../libs/cloudlets');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res)
{
if(!req.signedCookies.session)
  {
    res.clearCookie('session');
    res.redirect('/');
    return;
  }
  
  cloudlets.getCloudlets(req.signedCookies.session, function(err, body)
  {
    if(err)
    {
      console.error(err);
      res.redirect(400,'/dashboard/cloudlets');
      return;
    }
    body = JSON.parse(body);
    res.cookie('cloudletID', body['@id'] , {maxAge: 1800000/* 30min */, httpOnly: true, path: '/dashboard', signed: true});
    res.render('cloudlets');
  });
});

module.exports = router;
