var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	//console.log('is logged in:' + JSON.stringify(req.signedCookies.session));
	
	// check for logged in
	/*if(req.signedCookies.session) res.render('index', { title: 'OPENi-Dashboard' });
	else res.render('login');*/
	res.render('index', { title: 'OPENi-Dashboard' });
});

module.exports = router;
