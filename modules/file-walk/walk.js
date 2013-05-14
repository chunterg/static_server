var fs = require('fs');
exports.scan = function(dir){

	var files = [], folders = [], unFolders=[];
	try {
		files = fs.readdirSync(dir);
	} catch (e) {
		files = []
	}
	if (files.length > 0) {

		for (var i = 0; i < files.length; i++) {
			stats = fs.lstatSync(dir + files[i]);
			if (stats.isDirectory()) {
				folders.push({
					name: files[i],
					src: files[i],
					isDir: true
				});
			} else {
				unFolders.push({
					name: files[i],
					src: files[i],
					isDir: false
				});
			}
		}
		files = folders.concat(unFolders);
	}
	return files;
}