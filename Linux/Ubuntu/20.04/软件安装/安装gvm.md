# `Ubuntu 20.04` 安装 `gvm`

## 自动化脚本安装

```shell
$ sudo apt-get install curl git mercurial make binutils bison gcc build-essential

$ bash < <(curl -s -S -L https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer)
Cloning from https://github.com/moovweb/gvm.git to /home/iric/.gvm
No existing Go versions detected
Installed GVM v1.0.22

Please restart your terminal session or to get started right away run
 `source /home/iric/.gvm/scripts/gvm`
```

注意输出，需要将输出中的命令拷贝并执行

```shell
$ source /home/iric/.gvm/scripts/gvm
```
