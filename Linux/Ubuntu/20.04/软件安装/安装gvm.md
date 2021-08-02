# `Ubuntu 20.04` 安装 `gvm`

`gvm` 的[github地址](https://github.com/moovweb/gvm)

## 自动化脚本安装

```shell
$ sudo apt-get install curl git mercurial make binutils bison gcc build-essential

$ zsh < <(curl -s -S -L https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer)
Cloning from https://github.com/moovweb/gvm.git to /home/iric/.gvm
No existing Go versions detected
Installed GVM v1.0.22

Please restart your terminal session or to get started right away run
 `source /home/iric/.gvm/scripts/gvm`
```

> 提示：我是 `zsh` 终端，所以命令是以 `zsh` 开头的，官方文档上是 `bash` 开头的，如果按照官方文档安装，关闭终端后 `gvm` 命令并不在环境变量里面!

注意输出，需要将输出中的命令拷贝并执行

```shell
$ source /home/iric/.gvm/scripts/gvm
```

## 编辑环境配置文件

编辑 `~/.zshrc` 或者 `~/.bashrc` 文件，在文件末尾追加 `GO_BINARY_BASE_URL` 环境变量

```conf
# gvm 配置
export GO_BINARY_BASE_URL="https://mirrors.ustc.edu.cn/golang"
```

> 采坑提示：在 `Gitee` 上，有仓库的 `README` 提示要配置 `G_MIRROR` 环境变量，实际并不好使！官方 `issue` 中已经有讲到如何配置镜像地址了：[issue地址](https://github.com/moovweb/gvm/issues/192)

## 安装 `go` (1.5+)

```shell
$ gvm install go1.4 -B
$ gvm use go1.4
$ export GOROOT_BOOTSTRAP=$GOROOT
$ gvm install go1.16
$ gvm use go1.16 --default

# 安装完成，验证
$ go version
go version go1.16 linux/amd64
```

## 配置代理

生在天朝，你懂得

```shell
$ go env -w GO111MODULE=on
$ go env -w GOPROXY=https://goproxy.cn,direct
```
