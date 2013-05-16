var app = require('../../sys/node_modules/express')(),
  fs = require('fs');

exports.ajax = function(req, res) {

  var config = fs.readFileSync(__dirname + '/config.json', 'utf8'), res_data = '';
  //Remove the comment in config file
  config = config.replace(/\/\*[\w\W]*?\*\//gm, '').replace(/\/\/.*/gi, '')
  config = JSON.parse(config);
  for (var ac in config) {
    if (ac == req.params.action) {
      if (!config[ac].res_code || config[ac].res_code == 200) {
        res.status(200);
        //if get the correct param
        if (isMatchedArg(config[ac].req, req.query)) {
          console.log(JSON.stringify(config[ac].res.success))
          res_data = req.query.callback ? req.query.callback + '(' + JSON.stringify(config[ac].res.success) + ')' : config[ac].res.success;
          res.send(res_data); 
        } else {
          res_data = req.query.callback ? req.query.callback + '(' + JSON.stringify(config[ac].res.fail) + ')' : config[ac].res.fail
          res.send(res_data);
        }
      } else {
        res.status(config[ac].res_code);
        res.send(config[ac].res_code);
      }
      return;
    }
  }
  res.send(404);
}


// To determine the value of two object.

function isMatchedArg(data1, data2) {
  if (typeof data1 == 'object' && typeof data2 == 'object') {
    for (var d in data1) {
      if (data1.hasOwnProperty(d) && data2.hasOwnProperty(d)) {
        if (data1[d] != data2[d]) {
          return false;
        }
      } else {
        return false;
      }
    }
    return true;
  }
}