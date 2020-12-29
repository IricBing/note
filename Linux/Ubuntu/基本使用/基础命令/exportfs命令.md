# Ubuntu exportfs命令

该命令来自于 `nfs-kernel-server` 软件包，需安装后才可使用。安装命令如下：

``` shell
$ sudo apt install nfs-kernel-server    # 安装

$ sudo systemctl start nfs-kernel-server.service    # 启动
```

作用，修改了 `/etc/exports` 文件后加载其改动，类似于 `nginx -s reload` 操作。

用法：

``` shell
$ exportfs [-adfhioruvs] [host:/path]
```

参数释义：

* `-a`

  全部挂载（或卸载） `/etc/exports` 文件内的设定。

* ``-r

  重新挂载 `/etc/exports` 中的设置，此外同步更新 `/etc/exports` 及 `/var/lib/nfs/xtab` 中的内容。

* `-u`

  卸载某一目录。

* `-v`

  在 `export` 时将共享的目录显示在屏幕上。
