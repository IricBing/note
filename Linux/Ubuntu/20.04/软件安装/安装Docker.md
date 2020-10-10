# Ubuntu 20.04 安装 Docker

[Docker简介](../../../../容器/Docker/基础知识/简介.md)

## 官网安装方法（不推荐）

[官方文档](https://docs.docker.com/engine/install/ubuntu/)

不推荐的原因：因为走的docker官网的镜像源，国内嘛，呵呵。

## apt安装法

一行命令即可

``` shell
$ sudo apt install docker.io
```

## 换源

不用说，换源必不可少。

编辑 `/etc/docker/daemon.json` 文件，没有新建即可

``` shell
$ sudo vim /etc/docker/daemon.json
```

写入：

``` json
{
  "registry-mirrors": ["https://pee6w651.mirror.aliyuncs.com"]
}
```

保存，退出。

## 去掉sudo权限

安装好的Docker需要用sudo权限来启动，这不是一个好的习惯，会造成安全风险（题外话，Docker里面的root权限）

## 重启

换源后需要重启才能生效，重启命令如下：

``` shell
$ sudo service docker restart
```

## 开机自启动

默认Docker没有开机自启动功能的，需要我们手动给他添加到开机启动项中，如果不加，name每次开机后都要手动运行docker才行。

``` shell
$ systemctl enable docker.service
```
