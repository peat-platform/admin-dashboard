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

function createType(propName, openiType, required, multiple, allowedValues, contextID, referenceURL, cb)
{
	crud('POST', base + '/types',	{
										"@context": [ //Developer specified array of object property description,
									  		{
										    	"@property_name": propName, // (String) name of the property in the object.
									    		"@openi_type": openiType, // the primitive type that the property will be validated against, see openi_types
									    		"@required": required, // (true or false) specifies if the object can be created with or without this context entry.
									    		"@multiple": multiple, // (true or false) specifies if the property is an array or values or a single value.
									    		"@allowed_values": allowedValues, // this property limits the values that the property can be set to (e.g - [ "foo","bar","world"] )
									    		"@context_id": contextID // A context identifier for the property entry.
									  		}
										],
										"@reference": referenceURL, //Developer specified URL of the refernce type,
									}, cb);
}

function createMultipleTypes(session, id, cb)
{
	crud('PATCH', base + '/types', null, session, cb);
}

function listTypes(session)
{
	crud('GET', base + '/types', null, session, cb);
}

function getType(session, id, cb)
{
	crud('GET', base + '/types/' + id, null, session, cb);
}

function getTypesStats(session, id, cb)
{
	crud('GET', base + '/types/stats', null, session, cb);
}

module.exports.createType = createType;
module.exports.createMultipleTypes = createMultipleTypes;
module.exports.listTypes = listTypes;
module.exports.getType = getType;
module.exports.getTypesStats = getTypesStats;
module.exports.base = base;
