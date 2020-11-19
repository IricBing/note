# update-rc.d 命令

`update-rc.d` 是一个 `Perl脚本` ，是**用来自动升级System V类型初始化脚本**

这些脚本链接位于 `/etc/rc{0-6}.d/` 下，对应脚本位于 `/etc/init.d/` 下。

首先看一下命令自身的帮助文档：

``` shell
$ update-rc.d --help
usage: update-rc.d [-f] <basename> remove
       update-rc.d [-f] <basename> defaults
       update-rc.d [-f] <basename> defaults-disabled
       update-rc.d <basename> disable|enable [S|2|3|4|5]
		        -f: force

The disable|enable API is not stable and might change in the future.
```

接下来逐个讲解

## 
