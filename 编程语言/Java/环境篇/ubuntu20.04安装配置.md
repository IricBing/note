# `Ubuntu 20.04` 安装配置 `Java` 环境

## 安装

因为 `Ubuntu` 的 `apt` 源中已经内置了 `open-jdk` 的仓库地址，因此可以采用 `apt` 来直接安装，安装命令如下：

```shell
$ sudo apt install openjdk-8-jdk    # 安装OpenJDK 8

$ sudo apt install openjdk-11-jdk   # 安装OpenJDK 11
```

## 版本控制

作为开发来讲，版本控制必不可少，但是没有找到好用的 `Java` 环境下的版本控制软件，像 `node` 的 `nvm` 、 `go` 的 `gvm` 这些多么的强大与舒适，可惜我没有找到 `Java` 版的 `jvm`

> `PS` ：可能是 `jvm` 被占用了吧，哈哈 `^_^`

在 `Linux` 环境下， `Java` 环境的版本切换通过 `update-alternatives` 命令来实现。

```shell
$ sudo update-alternatives --config java
有 2 个候选项可用于替换 java (提供 /usr/bin/java)。

  选择       路径                                          优先级  状态
------------------------------------------------------------
* 0            /usr/lib/jvm/java-11-openjdk-amd64/bin/java      1111      自动模式
  1            /usr/lib/jvm/java-11-openjdk-amd64/bin/java      1111      手动模式
  2            /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java   1081      手动模式

要维持当前值[*]请按<回车键>，或者键入选择的编号：2
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java 来在手动模式中提供 /usr/bin/java (java)
```

这样就会将 `java` 指令指向 `OpenJDK 8` 了，同样，还需要配置 `javac`

```shell
$ sudo update-alternatives --config javac
有 2 个候选项可用于替换 javac (提供 /usr/bin/javac)。

  选择       路径                                        优先级  状态
------------------------------------------------------------
* 0            /usr/lib/jvm/java-11-openjdk-amd64/bin/javac   1111      自动模式
  1            /usr/lib/jvm/java-11-openjdk-amd64/bin/javac   1111      手动模式
  2            /usr/lib/jvm/java-8-openjdk-amd64/bin/javac    1081      手动模式

要维持当前值[*]请按<回车键>，或者键入选择的编号：2
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/javac 来在手动模式中提供 /usr/bin/javac (javac)
```
