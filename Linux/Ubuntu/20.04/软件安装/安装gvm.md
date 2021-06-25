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
