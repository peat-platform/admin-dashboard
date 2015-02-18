var request = require('request');
var cloudlets = require('../libs/cloudlets');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res)
{
if(!req.cookies.session)
  {
    res.redirect('/');
    return;
  }
  
  cloudlets.getCloudlets(req.signedCookies.session, function(err, body)
  {
    if(err)
    {
      res.redirect('/');
      return;
    }
    res.cookie('cloudletID', body['@id'], {signed: true});
    res.render('cloudlets');
  });
});

module.exports = router;
