#Static server
Static server by nodejs

## Features

  * Based on Express
  * Support ajax debug (worth try)
  * Support middleware extension
  * Support less compile
  * Support markdown

## What can ajax debug do?

If you want to debug a request like

```
http://ajax.yourdomain.com/getUserIdByName?name=chunterg
```

just set the confg.json file in lib/ajax-debug/config.json

```
{
	"rewrite":{
		"enable":true, //enable the url rewrite
		"map":["ajax.yourdomain.com"]  //the online domain to be rewrited.
		} ,
	"RequestMap": {
		"getUserIdByName": {
			"req": {
				"name": "chunterg"    //the expected request params
			},
			"res": {
				"success": {  // the sucess response for corrected params
					"data": "14",
					"status": "ok"
				},
				"fail": {    // the fail response for wrong params
					"message": "No match",
					"status": "fail"
				}
			}
		}
	}
}
```
## How to add middleware extensions?
Develop extension as middleware modlue

```
exports.run = function(cfg) {
	return function(req, res, next) {
		your code...
	}
}
```

Add extension to the config.json file 

```
{
	...
	"middlewares":[   
		"extension path",// the path for the middleware plugins
		"./lib/compile"
		]
	...
}
```

## How to use
### 1.Install dependent modules
```
npm install -g express jade less markdown
```

### 2.Set the config.json file
```
{
 	"port":3000,//server port
	"root":"D:/static", // the root dictionary of server
	"debug":true, //debug mode
	"middlewares":[   // the path for the middleware plugins
		"./lib/ajax-debug/ajax",
		"./lib/compile"
		]
}
```

### 3. start the server
In windows
```
run start.bat
```

In OSX/linux
```
$ node server path/start.js
```
