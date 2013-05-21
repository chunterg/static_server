var fs = require('fs');
var exec = require('child_process').exec;
var express = require('express');
var app = express();
var file_walk = require('./lib/walk');

//load server config
var cfg = fs.readFileSync(__dirname + '/config.json', 'utf8');
cfg = cfg.replace(/\/\*[\w\W]*?\*\//gm, '').replace(/\/\/.*/gi, '')
cfg = JSON.parse(cfg);
app.configure(function() {
	app.set('views', __dirname + '/view');
	app.set('view engine', 'jade');
	app.use(express.methodOverride());
	app.use(express.bodyParser());
	//load middleware plugins
	for(var i =0;i<cfg.middlewares.length;i++){
		app.use(require(cfg.middlewares[i]).run(cfg))
	}
	//set static file parse
	app.use(express.static(cfg.root,{
		maxAge:!cfg.cache?604800:0
	}));
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
	app.use(app.router);
	app.use(file_walk.walk(cfg))
});


app.listen(cfg.port);
console.log('server start');

//console.log(process.memoryUsage())
//exec("start http://localhost:" + cfg.port + "/");