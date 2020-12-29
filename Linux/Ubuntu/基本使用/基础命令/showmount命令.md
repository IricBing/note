# Ubuntu showmount命令

`showmount` 命令用于**查询NFS服务器**，该命令属于软件 `nfs-common` ， `Ubuntu 20.04 server` 已经默认安装了，低版本可自行安装（桌面版默认没有安装）。

安装命令：

``` shell
$ sudo apt install nfs-common
```

命令语法：

``` shell
showmount --help
Usage: showmount [-adehv]
       [--all] [--directories] [--exports]
       [--no-headers] [--help] [--version] [host]
```

参数释义：

* `-a`或`--all`

    以 `host:dir` 这样的格式来显示客户主机名和挂载点目录。

* `-d`或`--directories`

    仅显示被客户挂载的目录名。

* `-e`或`--exports`

    显示NFS服务器的输出清单。

* `-h`或`--help`

    显示帮助信息。

* `-v`或`--version`

    显示版本信。

* `--no-headers`

    禁止输出描述头部信息。
