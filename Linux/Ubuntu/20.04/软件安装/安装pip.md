# Ubuntu 20.04 安装 pip

`Python` 有两个主要的版本， `Python2.x` 和 `Python3.x` ，同样， `pip` 也有两个版本， `pip` 和 `pip3` ，分别对应 `2.x` 和 `3.x`

## 安装

``` shell
$ sudo apt install python3-pip # 安装pip3
```

## 换源

在国内这个是老生常谈的问题，不做介绍。

修改 `~/.pip/pip.conf` 文件（没有就创建一个），写入如下内容：

``` conf
[global]
index-url = https://mirrors.aliyun.com/pypi/simple
[install]
trusted-host=mirrors.aliyun.com
```
