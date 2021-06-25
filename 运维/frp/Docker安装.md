# Docker 安装frp

## 服务端

新建 `/etc/frp/frps.ini` 文件，写入如下内容：

```ini
[common]
bind_addr=0.0.0.0
bind_port=7000
#表示用于客户端和服务端连接的端口，这个端口号我们之后在配置客户端的时候要用到。

dashboard_addr = 0.0.0.0
dashboard_port = 7500
#是服务端仪表板的端口，若使用7500端口，在配置完成服务启动后可以通过浏览器访问 x.x.x.x:7500 （其中x.x.x.x为VPS的IP）查看frp服务运行信息。

token = 217595		
#是用于客户端和服务端连接的口令
dashboard_user = root
#表示打开仪表板页面登录的用户名，自行设置即可。
dashboard_pwd = 123qwe	
#表示打开仪表板页面登录的密码，自行设置即可。

vhost_http_port = 10080		
#给反向代理服务器（Nginx）使用
vhost_https_port = 10443	
#给反向代理服务器（Nginx）使用
```

运行docker容器：

```shell
$ docker run  --network host -d -v /etc/frp/frps.ini:/etc/frp/frps.ini --name frps --restart=always snowdreamtech/frps
```

## 客户端

按需在特定目录下新建 `frpc.ini` 文件，写入内容如下：

```ini
[common]
server_addr = xxx.xxx.xxx.xxx
server_port = 7000
token=xxxx

[九星-dev]
type=http
local_ip = 127.0.0.1
local_port=3000
custom_domains=server-9star.iricbing.xyz
```

启动命令：

```shell
$ docker run --restart=always --network host -d -v $PWD/frpc.ini:/etc/frp/frpc.ini --name frpc snowdreamtech/frpc
```
