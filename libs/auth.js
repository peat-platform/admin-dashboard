var request = require('request');

var base = 'https://' + '127.0.0.1' + ':443/api/v1/auth';

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

module.exports.listAuthorizations = listAuthorizations;
module.exports.createAuthorization = createAuthorization;
module.exports.deleteAuthorization = deleteAuthorization;
module.exports.createClient = createClient;
module.exports.createSession = createSession;
module.exports.deleteSession = deleteSession;
module.exports.refreshSession = refreshSession;
module.exports.createUser = createUser;
module.exports.base = base;