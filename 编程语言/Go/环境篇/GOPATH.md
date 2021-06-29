# `GOPATH`

## 是什么

`GOPATH` 是一个环境变量，主要用来指定 `go` 语言的**包所在路径**的，首先来查看一下这个环境变量的具体路径：

```shell
$ go env | grep GOPATH
GOPATH="/home/iric/.gvm/pkgsets/go1.16/global"
```

或者:

```shell
$ echo $GOPATH
/home/iric/.gvm/pkgsets/go1.16/global
```

> `注意` ：这里可以看到，我们现在的版本是 `1.16` ，因为从 `1.14` 开始，依赖已经发生了变化，我们先切换到 `1.10` 版本(因为 `Go Modules` 发布于 `Go1.11` ，成长于 `Go1.12` ，丰富于 `Go1.13` ，正式于 `Go1.14` 推荐在生产上使用)

```shell
$ gvm use go1.4 # 切换到1.4版本，因为后面的版本自举了

$ gvm install go1.10.8

$ gvm use go1.10.8
```

安装一个包试试：

```shell
$ go get github.com/gorilla/mux
```

接下来切换到 `$GOPATH` 中，并查看目录结构如下所示：

```shell
$ ch $GOPATH

$ tree -L 3 -a
.
├── overlay
│   ├── bin
│   └── lib
│       └── pkgconfig
├── pkg
│   └── linux_amd64
│       └── github.com
└── src
    └── github.com
        └── gorilla

10 directories, 0 files
```

> `PS:` 我这里怎么和网上的文章不一样啊，网上的文章 `overlay` 目录应该是 `bin` 目录，我这里好像 `bin` 目录被放到了 `overlay` 目录里面了。

接下来解析一下这些子目录含义：

* `overlay/bin`: 存储所编译生成的**二进制文件**。
* `pkg`: 存储预编译的目标文件，以加快程序的后续编译速度。
* `src`: 存储所有`.go`文件或源代码。在编写 `Go` 应用程序，程序包和库时，一般会以`$GOPATH/src/github.com/foo/bar`的路径进行存放。

在使用 `GOPATH` 模式下，我们需要将应用代码存放在固定的 `$GOPATH/src` 目录下，并且如果执行 `go get` 来拉取外部依赖会自动下载并安装到 `$GOPATH` 目录下。
