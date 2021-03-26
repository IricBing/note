# Docker 安装 TDengine

一键安装命令：

``` shell
$ docker run -d --name tdengine --restart=always -v /etc/taos:/etc/taos -p 6030:6030 -p 6035:6035 -p 6041:6041 -p 6030-6040:6030-6040/udp tdengine/tdengine:2.0.16.0
```

## 安装完成连接测试

``` shell
$ docker exec -it tdengine taos

Welcome to the TDengine shell from Linux, Client Version:2.0.16.0
Copyright (c) 2020 by TAOS Data, Inc. All rights reserved.

config file:/etc/taos/taos.cfg not found, all variables are set to default
taos>
```
