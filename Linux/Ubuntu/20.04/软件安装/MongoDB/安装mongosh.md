# 安装 `mongosh`

[官方文档](https://docs.mongodb.com/mongodb-shell/install/)

### `Step1.` 添加 `public GPG key`

```shell
$ wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
```

如果遇到错误，说没有 `gnupg` 软件包的情况下，就安装一下这个软件

```shell
$ sudo apt install gnupg
```

之后继续添加 `public GPG key` 即可。

### `Step2.` 创建 `apt` 源地址配置文件

```shell
$ echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
```

### `Step3.` 安装

```shell
$ sudo apt update
$ sudo apt-get install -y mongodb-mongosh
```
