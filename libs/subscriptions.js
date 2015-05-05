/**
 * Created by dconway on 20/03/15.
 */

var request = require('request');

var base = 'https://' + '127.0.0.1' + ':443/api/v1';
//var base = '/api/v1';

function crud(method, uri, body, authorization, cb)
{
   request({
      method: method,
      uri: uri,
      json: body,
      headers: (authorization != null ? {'Authorization': authorization} : {}),
      strictSSL: false
   }, function (err, res, body)
   {
      if(body && body.error)
         err = body.error;
      cb(err, body);
   });
}

function getSubscriptions(session, cb)
{
   crud('GET', base + '/subscription', null, session, cb);
}


module.exports.getSubscriptions = getSubscriptions;
module.exports.base = base;