# Ubuntu 20.04 安装Git

## 安装

apt中已经包含Git软件包，直接安装即可。

``` shell
$ sudo apt install git
```

## 生成 ssh key

``` shell
$ ssh-keygen
```

说明：此命令执行后会在 `~/.ssh` 文件夹下产生一些文件，使用 `tree` 命令可以得到如下结果：

``` shell
.
├── id_rsa
├── id_rsa.pub
└── known_hosts

0 directories, 3 files
```

其中 `id_rsa` 为私钥文件， `id_rsa.pub` 为公钥文件（将这里面的内容配置到gitlab，github等平台的ssh key中即可完成身份验证）， `known_hosts` 文件为本地存储的其他服务器指纹信息（这个文件有空在讲，可自行百度）。
