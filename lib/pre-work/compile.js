var fs = require('fs');
var path = require('path');
var less = require('../../sys/node_modules/less');
var md = require('../../sys/node_modules/markdown').markdown;
exports.compile = function(cfg) {
	// Middleware
	return function(req, res, next) {
		try {
			var fileContent = fs.readFileSync(cfg.root + req.originalUrl, 'utf8');
			switch (path.extname(req.originalUrl)) {
				case '.less':
					less.render(fileContent, function(e, css) {
						res.set({
							'Content-Type': 'text/css',
						});
						res.send(css);
						res.end();
					});
					break;
				case '.md':
					res.render('markdown', {
						title: 'md - Node static server',
						body: md.toHTML(fileContent)
					});
					res.end();
					break;
				default:
					next();
			}
		} catch (e) {
			//console.log(e);
			next();
		}

	}

}