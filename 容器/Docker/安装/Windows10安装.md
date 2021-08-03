# `Windows 10` 安装 `Docker`

## 下载 `Docker Desktop`

直接去官网下载即可，官网[下载地址](https://www.docker.com/products/docker-desktop)

## 修改安装地址

由于 `Docker Desktop Installer` 的**默认安装地址**为 `C盘` ，**也不让选择**，因此我们需要先设置一个 `软连接` ，将 `C:\Program Files\Docker` 指到 `E盘` 下面，这样之后再安装的时候就直接安装到 `E盘` 了（需要先建立： `E:\Program Files\Docker` 文件夹）

```shell
$ mklink /j "C:\Program Files\Docker" "E:\Program Files\Docker"
Junction created for C:\Program Files\Docker <<===>> E:\Program Files\Docker
```

> 提示：此命令**必须以管理员身份运行 `CMD` 才可以**，普通用户是没有权限的。

## 数据文件迁移

### 原因

默认 `Docker Desktop` 安装在 `C盘` ，并且后面所有的镜像，容器等等都运行在 `C盘` ，会导致 `C盘` 占用过大。我们当然是想将其安装到其他盘符了。目前大家普遍使用的应该是 `wsl2` ，之前的就不介绍了（之前版本迁移更容易，网上查一下即可。）

`docker desktop` 在安装的时候创建两个 `wsl` 子系统。分别是： `docker-desktop` 和 `docker-desktop-data` 。通过命令 `wsl -l -v --all` 来查看一下当前系统中的 `wsl` 子系统。

```shell
$ wsl -l -v --all
  NAME                   STATE           VERSION

* Ubuntu-20.04           Stopped         1

  docker-desktop-data    Stopped         1
  docker-desktop         Stopped         1
```

> 其中 `Ubuntu-20.04` 是我自己安装的，忽略这个。

`docker-desktop` 是存放程序的， `docker-desktop-data` 是存放镜像的，这两个 `wsl` 子系统都是默认放在**系统盘**的。

[官方issue](https://github.com/docker/for-win/issues/5829#issuecomment-622442186)

> 官方 `issue` 的意思是只需要迁移 `docker-desktop-data` 这个 `wsl` 系统即可， `docker-desktop` 并不必进行迁移。

### 迁移

首先将**Docker停止**，有正在运行的容器也全部停掉。

#### `Step1.` 导出 `wsl` 子系统镜像

打开 `cmd` 终端，注意下面两条命令会在当前位置生成一个文件： `docker-desktop-data.tar` ，所以还是找一个特定的位置打开 `cmd` 吧。

```shell
$ wsl --export docker-desktop-data docker-desktop-data.tar
```

> 如果正常，应该会在此文件夹下看到一个文件：： `docker-desktop-data.tar`

#### `Step2.` 删除现有的 `wsl` 子系统

```shell
$ wsl --unregister docker-desktop-data
正在注销...
```

#### `Step3.` 重新创建 `wsl` 子系统

先在想要放置数据的位置创建个文件夹，我是在 `E盘` 下创建了 `DockerDesktopData` 文件夹，用来存储 `docker-desktop-data`  `wsl` 子系统数据的。

```shell
$ wsl --import docker-desktop-data E:\DockerDesktopData E:\docker-desktop-data.tar --version 2
```

#### `Step4.` 重启电脑
