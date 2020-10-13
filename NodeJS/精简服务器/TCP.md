# NodeJS 精简TCP服务器

## 服务端

新建 `server.js` 文件，写入以下代码：

``` javascript
var net = require('net'); //使用内置‘net’包

const PORT = 10001; //监听端口
const HOST = '0.0.0.0'; //允许连接的地址，和数据库的bind设计一样

var clientHandler = function(socket) {

    //客户端发送数据的时候触发data事件
    socket.on('data', function dataHandler(data) { //data是客户端发送给服务器的数据
        console.log(socket.remoteAddress, socket.remotePort, 'send', data.toString());
        //服务器向客户端发送消息
        socket.write('server received\n');
    });

    //当对方的连接断开以后的事件
    socket.on('close', function() {
        console.log(socket.remoteAddress, socket.remotePort, 'disconnected');
    })
};

//创建TCP服务器的实例
//传入的参数是：监听函数clientHandler
var app = net.createServer(clientHandler);

app.listen(PORT, HOST);
console.log('tcp server running on tcp://', HOST, ':', PORT);
```

**启动**

``` shell
$ node server.js
```

## 客户端

新建 `client.js` 文件，写入以下代码：
```javascript
var net = require('net');   //使用内置‘net’包

const HOST = '47.93.244.225';   //服务器地址
const PORT = 6000;      //服务器端口

var tcpClient = net.Socket();

tcpClient.connect(PORT, HOST, function(){
   console.log('connect success.');
   tcpClient.write('hello world');//服务器向客户端发送消息
});

//监听服务器端发过来的数据
tcpClient.on('data', function(data){
   console.log('received: ', data.toString());
});
```

**启动**

``` shell
$ node client.js
```

