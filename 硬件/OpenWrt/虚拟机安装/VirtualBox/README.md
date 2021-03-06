# VirtualBox 安装 OpenWrt

## 环境

操作系统： `Ubuntu 20.04`

架构： `x64`

`VirtualBox` 版本： `6.1.18 r142142 (Qt5.12.8)`

`OpenWrt` 版本： `19.07.7`

## 官方镜像下载

> 温馨提示：首先去[OpenWrt的清华镜像源](https://mirrors.tuna.tsinghua.edu.cn/openwrt/)查看一下镜像源所支持的 `OpenWrt` 版本，因为 `OpenWrt` 更新过于频繁，清华源可能来不及同步。。。（PS：亲身采坑）

官方下载地址：https://downloads.openwrt.org/releases/

本笔记下载版本：https://downloads.openwrt.org/releases/19.07.7/targets/x86/64/openwrt-19.07.7-x86-64-combined-ext4.img.gz

## VirtualBox镜像制作

将下载好的官方镜像解压，得到img文件，在此目录打开终端，输入如下命令来制作 `VirtualBox` 镜像

``` shell
$ VBoxManage convertfromraw --format VDI openwrt-19.07.7-x86-64-combined-ext4.img openwrt.vdi 
```

之后就能得到 `openwrt.vdi` 文件，这个文件就是 `VirtualBox` 的镜像文件。
