var request = require('request');
var jwt = require('jsonwebtoken');
var crud = require('../libs/crud');
var config = require('../libs/config');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res)
{
  try
  {
    var verified = jwt.verify(req.signedCookies.session, config.key.verify, { algorithm: 'RS256'});
    // var signed = jwt.sign(verified, config.key.sign, { algorithm: 'RS256'});
  }
  catch(e)
  {
    console.log(e);
    //res.render('error', {'message': 'Authorization invalid', 'error': {'stack': '', 'status': ''}});
    res.redirect(400,'/');
    return;
  }

  // approach from Johannes to get authorized apps ?
  // or use auth.listAuthorizations(session) / for show crud here
  crud.query('SELECT meta() as meta, * FROM authorizations WHERE username = \'' + verified.user_id + '\';', function(err, body)
  {
    if(err)
      res.redirect(400,'/dashboard');
    console.log("show authorizations -> "+body);
    res.render('apps', {'data': body});
  });
});

module.exports = router;
