# `Ubuntu` 安装 

## 前言

[官方安装地址](https://about.gitlab.com/install/#ubuntu)

本次安装环境是一个全新的云服务器，操作系统是 `Ubuntu 18.04` ，本次安装采用 `apt` 方式，支持邮箱等配置，并且支持自动 `ssl` 证书续期，此服务器仅用于 `git` 服务，所以 `80` 和 `443` 端口可以直接使用。

## `Step1.` 安装必要依赖

```shell
$ sudo apt update

$ sudo apt install curl openssh-server ca-certificates tzdata perl postfix
```

## `Step2.` 添加 `gitlab` 仓库源

```shell
$ curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.deb.sh | sudo bash
```

## `Step3.` 安装

```shell
$ sudo EXTERNAL_URL="https://git.9xing.cn" apt install gitlab-ce

# 由于gitlab服务器处在国外，apt直接安装可能会造成下载过慢，可采用代理方式
$ sudo EXTERNAL_URL="https://git.9xing.cn" apt -o Acquire::https::proxy="http://127.0.0.1:1088/" -o Acquire::http::proxy="http://127.0.0.1:1088/" install gitlab-ce
```

## ` Step4.` 登录使用

正常情况下，安装完成 `gitlab` 会自动占用 `80` 和 `443` 端口，并自动开启 `http转发https` ，证书也不用我们操心，它会自动使用 `letsencript` 自动生成的。

安装完成后我们需要在 `/etc/gitlab/initial_root_password` 文件中获取到 `root` 用户的密码

> 提示：如果没有这个文件，请看下面的采坑部分。

## 采坑

### 证书生成失败

不用做任何操作，多执行几遍 `sudo gitlab-ctl recofigure`

### 没有初始密码文件

```shell
$ sudo gitlab-rake "gitlab:password:reset"
```
