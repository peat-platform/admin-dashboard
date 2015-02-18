var request = require('request');
var search = require('../libs/search');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res)
{
if(!req.cookies.session)
  {
    res.redirect('/');
    return;
  }
  
  search.search(params, req.cookies.session, function(err, body)
  {
    if(err)
    {
      res.redirect('/');
      return;
    }
    res.render('search');
  });
});

module.exports = router;
