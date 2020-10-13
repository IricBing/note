# Ubuntu apt 篇

apt 命令是在Ubuntu16.04发布时引入的。

## apt与apt-get

### 背景
Debian 作为 Ubuntu、Linux Mint 和 elementary OS 等 Linux 操作系统的母板，其具有强健的`包管理系统`，它的每个组件和应用程序都内置在系统中安装的软件包中。Debian 使用一套名为 `Advanced Packaging Tool（APT）`的工具来管理这种包系统，不过`请不要把它与 apt 命令混淆，它们之间是其实不是同一个东西`。

在基于 Debian 的 Linux 发行版中，有各种工具可以与 APT 进行交互，以方便用户安装、删除和管理的软件包。`apt-get 便是其中一款广受欢迎的命令行工具`，另外一款较为流行的是 `Aptitude` 这一`命令行与 GUI 兼顾`的小工具。

### apt出发点

apt 命令的引入就是为了解决命令过于分散的问题。

apt-get、apt-cache 和 apt-config 些命令都比较低级又包含众多功能，普通的 Linux 用户也许永远都不会使用到。换种说法来说，就是最常用的 Linux 包管理命令都被分散在了 apt-get、apt-cache 和 apt-config 这三条命令当中。

apt包括了 apt-get 命令出现以来使用最广泛的功能选项，以及 apt-cache 和 apt-config 命令中很少用到的功能。

在使用 apt 命令时，用户不必再由 apt-get 转到 apt-cache 或 apt-config，而且 apt 更加结构化，并为用户提供了管理软件包所需的必要选项。

> 简单来说就是：apt = apt-get、apt-cache 和 apt-config 中最常用命令选项的集合。

### apt和apt-get命令之间的区别

虽然 apt 与 apt-get 有一些类似的命令选项，但它并不能完全向下兼容 apt-get 命令。也就是说，可以用 apt 替换部分 apt-get 系列命令，但不是全部。

|apt 命令|取代的命令|命令的功能|
|-----|-----|-----|
|apt install|apt-get install|安装软件包|
|apt remove|apt-get remove|移除软件包|
|apt purge|apt-get purge|移除软件包及配置文件|
|apt update|apt-get update|刷新存储库索引|
|apt upgrade|apt-get upgrade|升级所有可升级的软件包|
|apt autoremove|apt-get autoremove|自动删除不需要的包|
|apt full-upgrade|apt-get dist-upgrade|在升级软件包时自动处理依赖关系
|apt search|apt-cache search|搜索应用程序|
|apt show|apt-cache show|显示安装细节|

当然，apt 还有一些自己的命令：
|新的apt命令|命令的功能|
|-----|-----|
|apt list|列出包含条件的包（已安装，可升级等）|
|apt edit-sources|编辑源列表|