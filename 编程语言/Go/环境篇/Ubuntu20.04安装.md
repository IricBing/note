# `Ubuntu 20.04` 安装

## 先上采坑安装方式

`golang` 软件包已经内置在 `apt` 仓库中，可直接通过 `apt` 安装，安装命令如下：

```shell
$ sudo apt install golang
```

安装完成后测试:

```shell
$ go version
go version go1.13.8 linux/amd64
```

> `采坑原因` ：apt中的包都比较老嘛，通常我们项目又有版本控制的需求，因此**不要用这种方式安装！**

## 优雅的安装方式

在 `node` 环境下，我们有 `nvm` 来控制 `node` 的版本， `golang` 中也有类似的生态工具，叫 `gvm`

具体安装请转至笔记：[Ubuntu20.04安装gvm](../../../Linux/Ubuntu/20.04/软件安装/安装gvm.md)
