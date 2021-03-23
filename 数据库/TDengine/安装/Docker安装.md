# Docker 安装 TDengine

一键安装命令：

``` shell
$ docker run -d --restart=always -v /etc/taos:/etc/taos -p 6030:6030 -p 6035:6035 -p 6041:6041 -p 6030-6040:6030-6040/udp tdengine/tdengine:2.0.16.0
```
