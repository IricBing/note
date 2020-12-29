# Ubuntu 20.04 搭建NFS文件系统

关于 `NFS文件系统` 释义请转至笔记：[NFS文件系统](../../../基础篇/文件系统/nfs/README.md)

## 安装NFS服务

``` shell
$ sudo apt install nfs-kernel-server    # 安装

$ sudo systemctl start nfs-kernel-server.service    # 启动
```

## 服务配置

默认情况下， `NFS` 服务器上定义了某个共享目录，则该目录及其子目录下的所有文件都可被访问。
出于对安全的考虑，客户端任何需要超级用户（即 `root` 用户， `UID=0 & GID=0` ）权限的文件操作都默认映射到 `UID=65534` 和 `GID=65534` 的用户，即 `Ubuntu` 系统中的 `nobody:nogroup` 。

例如客户端使用 `root` 权限在挂载的共享目录中创建文件时，该文件的属主和属组自动变为 `nobody:nogroup` ，而非 `root:root` 。

### 创建共享目录

``` shell
$ sudo mkdir -p /var/nfs/gernel
$ sudo mkdir -p /var/nfs/public
$ sudo chown nobody:nogroup /var/nfs/gernel
```

### 修改 `/etc/exports` 文件

为了使 `NFS` 服务器定义的共享文件可被指定的客户端主机访问，需要在服务器端的 `/etc/exports` 文件中添加对应的记录。
该文件的格式如下：

``` conf
Directory Host(Options ...) Host(Options) #comment
```

关于 `/etc/exports` 文件的详细语法格式可参考 `man exports` 。

示例：

``` conf
/var/nfs/gernel  192.168.56.0/24(rw,insecure,sync,no_subtree_check)
/var/nfs/public  *(ro,insecure,sync,no_subtree_check)
/home/starky 192.168.56.1(rw,insecure,no_root_squash,sync,no_wdelay,no_subtree_check)
```

配置解释：

* 第一条纪录表示 `192.168.56.0/24` 子网中的所有主机都可挂载 `var/nfs/gernel` 目录并拥有**读写（rw）**权限

* 第二条纪录表示所有主机都可挂载 `/var/nfs/public` 目录且拥有**只读（ro）**权限

* 第三条纪录表示客户端 `IP` 地址为 `192.168.56.1` 的主机可以挂载 `/home/starky` 目录并拥有读写权限，而且任何 `root` 权限（`UID=0 , GID=0`）的文件操作都不默认映射给 `nobody:nogroup`，而保持属主（组）仍为 `root`（`no_root_squash`）

* `insecure` 选项：允许通过**任意端口**的远程访问

* `sync` 选项：**强制** `NFS` 服务器在响应请求之前将文件的改动写入磁盘（强调客户端和服务端文件内容的**一致性**，但会**降低文件操作的效率**）

* `no_wdelay`： 若有写操作则**立即执行**，应与`sync`配合使用

* `no_subtree_check` 选项：禁用 `subtree_check` 。`subtree_check` 用来设置服务器在收到请求时，检查该文件是否在指定目录结构中依旧可用（该选项会在某些情况下发生错误：重命名某文件的同时，该文件在客户端打开）。

### 更新配置使其生效

``` shell
$ sudo exportfs -a
```

## 客户端挂载

### 查看可用共享目录

``` shell
$ showmount -e 192.168.56.102
Exports list on 192.168.56.102:
/home/starky                        192.168.56.1
/var/nfs/public                     *
/var/nfs/gernel                     192.168.56.0/24
```

### 创建挂载点

``` shell
$ sudo mkdir -p /mnt/nfs/gernel
$ sudo mkdir -p /mnt/nfs/public
$ sudo mkdir -p /mnt/nfs/starky
```

### 挂载远程目录

``` shell
$ sudo mount 192.168.56.102:/var/nfs/gernel /mnt/nfs/gernel
$ sudo mount 192.168.56.102:/var/nfs/public /mnt/nfs/public
$ sudo mount 192.168.56.102:/home/starky /mnt/nfs/starky
```

## 系统启动时自动挂载共享目录

可编辑 `/etc/fstab` 文件令挂载共享目录的 `mount` 操作成为系统的固定配置（手动输入的 `mount` 命令属于**临时挂载**，重启会自动卸载），使得系统重启后可以自动挂载远程文件系统。

`/etc/fstab` 文件的示例内容如下：

``` conf
# filesystem                    mountpoint       fstype  flags                        dump    fsck
192.168.56.102:/var/nfs/gernel  /mnt/nfs/gernel  nfs     rw,bg,intr,hard,nodev,nosuid 0       0
192.168.56.102:/var/nfs/public  /mnt/nfs/public  nfs4    ro,bg,intr,soft,nodev,nosuid 0       0
192.168.56.102:/home/starky     /mnt/nfs/starky  nfs     rw,bg,intr,hard,nodev,nosuid 0       0
```
