var fs = require('fs');
var exec = require('child_process').exec;
var express = require('../node/node_modules/express');
var app = express();

//include request-map module
var req_map = require('./modules/request-map/ajax');

//include file walk module
var file_walk = require('./modules/file-walk/walk');
//load server config
var cfg = fs.readFileSync(__dirname + '/config.json', 'utf8');
cfg = JSON.parse(cfg);
app.configure(function() {
	app.set('views', __dirname + '/view');
	app.set('view engine', 'jade');
	app.use(express.methodOverride());
	app.use(express.bodyParser());
	app.use(express.static(cfg.root, {
		maxAge: 86400000
	}));
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
	app.use(app.router);
});
app.all('/ajax/:action', function(req, res) {
	req_map.ajax(req, res);
})
app.use(function(req, res, next) {
	if (req.originalUrl !== '/ajax/') {
		var str = file_walk.scan(cfg.root + req.originalUrl);
		res.render('layout', {
			_root: req.get('host'),
			title: 'Node static server',
			h1: cfg.root + req.originalUrl,
			body: str
		});
	}
	res.end();

});

app.listen(cfg.port);
console.log('server start');
exec("start http://localhost:" + cfg.port + "/");