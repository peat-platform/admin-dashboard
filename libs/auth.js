var request = require('request');
var http = require('http');

//var base = 'https://' + '127.0.0.1' + ':443/api/v1/auth';
var base = 'https://demo2.openi-ict.eu:443/api/v1/auth';
//var host = 'demo2.openi-ict.eu';
//var base = '/api/v1/auth';

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

	/*body = JSON.stringify(body);
	//var headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

	var options = {
		host: host,
		port: 443,
		path: uri,
		method: method,
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	};	

	if(authorization) {
		options.headers['Authorization'] = authorization; 
		console.log('\nADD AUTH_HEADER: '+authorization+'\n'+JSON.stringify(options.headers) );		
	}
	if(body) {
		options.headers['Content-Length'] = body.length;
		console.log('\nADD CONTENT-LENGTH_HEADER: '+body.length+'\n'+JSON.stringify(options.headers) );
		 
	}	

	var req = http.request(options, function(res) {
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');

		res.on('data', function (chunk) {
	    	console.log('AUTH-BODY: ' + chunk);
	  	});
	});

	req.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});

	// write data to request body
	req.write(body);
	req.end();*/
}

/* this endpoint is not supported anymore
function listAuthorizations(session)
{
	crud('GET', base + '/authorizations', null, session, cb);
}
*/

function createAuthorization(cb)
{
	crud('POST', base + '/authorizations', {'username': username, 'password': password, 'api_key': apiKey, 'secret': secret}, null, cb);
}

/* this endpoint is not supported anymore
function deleteAuthorization(session, id, cb)
{
	crud('DELETE', base + '/authorizations/' + id, null, session, cb);
}
*/

function createClient(client, secret, cb)
{
	crud('POST', base + '/clients', {'client': client, 'secret': secret}, null, cb);
}

function createSession(username, password, cb)
{
	crud('POST', base + '/sessions', {'username': username, 'password': password}, null, cb);
}

function deleteSession(session, cb)
{
	crud('DELETE', base + '/sessions', {'session': session}, null, cb);
}

function refreshSession(session, cb)
{
	crud('PUT', base + '/sessions', {'session': session}, null, cb);
}

function createUser(username, password, cb)
{
	crud('POST', base + '/users', {'username': username, 'password': password}, null, cb);
}

//module.exports.listAuthorizations = listAuthorizations;
module.exports.createAuthorization = createAuthorization;
//module.exports.deleteAuthorization = deleteAuthorization;
module.exports.createClient = createClient;
module.exports.createSession = createSession;
module.exports.deleteSession = deleteSession;
module.exports.refreshSession = refreshSession;
module.exports.createUser = createUser;
module.exports.base = base;