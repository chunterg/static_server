Static server
=============

Static server by nodejs

## Features

  * Based on Express
  * Support ajax [request map](https://github.com/chunterg/Request-map)
  * Support less compile
  * Support markdown

## How to use
### 1.Set the config.json file
```js
{
 "port":3000,//server port
	"root":"D:/static", // the root dictionary of server
	"debug":true, //debug mode
	"compileLess":true //auto compile less to css
}
```
### 2. start the server
In windows
```js
run start.bat
```

In OSX/linux
```js
$ node server_path/start.js
```
