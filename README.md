#Static server
Static server by nodejs

## Features

  * Based on Express
  * Support ajax [request map](https://github.com/chunterg/Request-map)
  * Support less compile
  * Support markdown

## How to use
### 1.Install dependent modules
```
npm install -g express jase less markdown
```

### 2.Set the config.json file
```
{
 	"port":3000,//server port
	"root":"D:/static", // the root dictionary of server
	"debug":true, //debug mode
	"compileLess":true //auto compile less to css
}
```

### 3. start the server
In windows
```
run start.bat
```

In OSX/linux
```
$ node server_path/start.js
```
