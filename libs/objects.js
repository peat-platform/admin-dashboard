var request = require('request');

//var base = 'https://' + '127.0.0.1' + ':443/api/v1';
//var base = 'https://demo2.openi-ict.eu:443/api/v1';
var host = 'https://demo2.openi-ict.eu';
var base = '/api/v1';

function crud(method, uri, body, authorization, cb)
{
	/*request({
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
	});*/

	var postData = '';
	if(body) postData = body.stringify;

	var options = {
		host: host,
		port: 443,
		path: uri,
		method: method,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
	    	'Content-Length': postData.length,
	    	'Authorization': authorization
	  	}
	};

	var req = https.request(options, function(res) {
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
	req.write(postData);
	req.end();
}

function createObject(session, cloudletID, cb)
{
	crud('POST', base + '/objects/' + cloudletID, null, session, cb);
}

function getObjectOfCloudlet(session, cloudletID, objectID, cb)
{
	crud('GET', base + '/objects/' + cloudletID +'/' + objectID, null, session, cb);
}

function getAllObjectsOfCloudlet(session, cloudletID, cb)
{
	crud('GET', base + '/objects/' + cloudletID, null, session, cb);
}

function updateObject(session, cloudletID, objectID, revision, cb)
{
	crud('PUT', base + '/objects/' + cloudletID +'/' + objectID, null, session, cb);
}

function deleteObjectFromCloudlet(session, cloudletID, objectID, cb)
{
	crud('DELETE', base + '/objects/' + cloudletID +'/' + objectID, null, session, cb);
}

module.exports.createObject = createObject;
module.exports.getObjectOfCloudlet = getObjectOfCloudlet;
module.exports.getAllObjectsOfCloudlet = getAllObjectsOfCloudlet;
module.exports.updateObject = updateObject;
module.exports.deleteObjectFromCloudlet = deleteObjectFromCloudlet;
module.exports.base = base;