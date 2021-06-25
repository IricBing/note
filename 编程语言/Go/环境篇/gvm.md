# gvm

## 查看可用版本

```shell
$ gvm listall
```

## 安装版本(1.5+)

按照[官方文档](https://github.com/moovweb/gvm)上将的，从 `1.5` 版本开始，移除了 `C compilers` ，需要先安装 `1.4` 版本，才能安装更高的版本

```shell
$ gvm install go1.4 -B
$ gvm use go1.4
$ export GOROOT_BOOTSTRAP=$GOROOT
$ gvm install go1.16
$ gvm use go1.6

# 安装完成，验证
$ gvm version
go version go1.16 linux/amd64
```
