# Ubuntu `find` 命令

## 基本语法

``` shell
$ find   path   -option   [   -print ]   [ -exec   -ok   command ]   {} \;
```

**参数说明：**

`find` 根据下列规则判断 `path` 和 `expression` ，在命令列上第一个 `-` 、 `()` 、 `,` 、 `!` 之前的部份为 `path` ，之后的是 `expression` 。如果 `path` 是空字串则使用**目前路径**，如果 `expression` 是空字串则使用 `-print` 为**预设** `expression` 。

* `expression` 中可使用的选项有二三十个之多，在此只介绍最**常用**的部份。
  +  **-mount, -xdev** : 只检查和指定目录在同一个文件系统下的文件，避免列出其它文件系统中的文件

  +  **-amin n** : 在过去 `n` 分钟内被读取过

  +  **-anewer file** : 比文件 `file` 更晚被读取过的文件

  +  **-atime n** : 在过去`n`天内被读取过的文件

  +  **-cmin n** : 在过去 `n` 分钟内被修改过

  +  **-cnewer file** : 比文件 `file` 更新的文件

  +  **-ctime n** : 在过去`n`天内被修改过的文件

  +  **-empty** : 空的文件`-gid n` or `-group name` : `gid` 是 `n` 或是 `group` 名称是 `name`

  +  **-ipath p, -path p** : 路径名称符合 `p` 的文件，`ipath` 会**忽略大小写**

  +  **-name name, -iname name** : 文件名称符合 `name` 的文件。`iname` 会**忽略大小写**

  +  **-size n** : 文件大小 是 `n` 单位，`b` 代表 `512` 位元组的区块，`c` 表示**字元数**，`k` 表示 `kilo bytes`，`w` 是二个位元组。

  +  **-type c** : 文件类型是 `c` 的文件。

  +  **d**: 目录

  +  **c**: 字型装置文件

  +  **b**: 区块装置文件

  + **p**: 具名贮列

  +  **f**: 一般文件

  + **l**: 符号连结

  + **s**: `socket`

  + **-pid n** : `process id` 是 `n` 的文件
