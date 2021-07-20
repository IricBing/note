# `Ubuntu 20.04` 安装 `Rust`

`rust` 官网的[安装方法](https://www.rust-lang.org/tools/install)在国内安装已经 `OK` 了，不需要单独配置镜像源了

> 笔记记录时间： `2021-6-20` 日，亲测可直接安装，无需翻墙。

## 安装命令

```shell
$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

## 升级

因为 `rust` 更新非常频繁，所以需要不定时更新一下自己的版本，更新命令如下：

```shell
$ rustup update
```
