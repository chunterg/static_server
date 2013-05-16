var fs = require('fs');
var exec = require('child_process').exec;
var express = require('./sys/node_modules/express');
var app = express();
//include request-map module
var req_map = require('./lib/request-map/ajax');
//include file walk module
var file_walk = require('./lib/file-walk/walk');
//include file walk module
var pre = require('./lib/pre-work/compile');

//load server config
var cfg = fs.readFileSync(__dirname + '/config.json', 'utf8');
cfg = JSON.parse(cfg);
app.configure(function() {
	app.set('views', __dirname + '/view');
	app.set('view engine', 'jade');
	app.use(express.methodOverride());
	app.use(express.bodyParser());
	app.use(pre.compile(cfg))	
	app.use(express.static(cfg.root,{
		maxAge:!cfg.debug?604800:0
	}));
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
	app.use(app.router);
	app.use(file_walk.walk(cfg))

});

app.all('/ajax/:action', function(req, res) {
	req_map.ajax(req, res);
})


app.listen(cfg.port);
console.log('server start');

//console.log(process.memoryUsage())
exec("start http://localhost:" + cfg.port + "/");