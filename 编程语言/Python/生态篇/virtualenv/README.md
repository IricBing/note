# Python virtualenv 用法

[官方文档](https://docs.python.org/zh-cn/3/library/venv.html#module-venv)

## virtualenv介绍

每个语言都会有一个版本迭代的过程，例如 `Python` 的主流版本有两个， `2.x` 和 `3.x` ，然而这两个还是**破坏性升级**，语法不兼容，库不可共用。就算是大版本相同，里面的小版本也可能造成不兼容的问题。

在开发的过程中，必须保证代码运行的基础环境是一样的，不能在 `Python3.8` 环境下开发测试，之后丢到 `Python3.6` 平台上去运行！

为了解决这个需求，可以采用 `virtualenv` 功能，或者 [Docker](../../../../容器/Docker/README.md) 来运行。本篇记录 `virtualenv` 功能的使用。

## 创建独立Python运行环境

``` shell
$ python3 -m venv /path/to/new/virtual/environment

e.g. $ python3 -m venv demo

$ tree -L 3 -a
.
├── demo
│   ├── bin
│   │   ├── activate
│   │   ├── activate.csh
│   │   ├── activate.fish
│   │   ├── Activate.ps1
│   │   ├── easy_install
│   │   ├── easy_install-3.8
│   │   ├── pip
│   │   ├── pip3
│   │   ├── pip3.8
│   │   ├── python -> python3
│   │   └── python3 -> /home/iric/.espressif/python_env/idf4.2_py3.8_env/bin/python3
│   ├── include
│   ├── lib
│   │   └── python3.8
│   ├── lib64 -> lib
│   ├── pyvenv.cfg
│   └── share
│       └── python-wheels
└── .gitignore

8 directories, 13 files
```

## 激活虚拟环境

``` shell
$ source demo/bin/activate
```

如果成功，则会在终端前显示 `demo` 目录：

``` shell
(demo) 
~/桌面/test/python-tensorflow-test » 
```
