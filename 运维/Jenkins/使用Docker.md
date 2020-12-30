# Jenkins 使用 Docker

在 `Jenkins` 中使用 `Docker` 会有权限问题，因为 `docker` 进程使用 `Unix Socket` 而不是 `TCP` 端口。而默认情况下， `Unix socket` 属于 `root` 用户，需要 `root` 权限才能访问。这样的话 我们就需要用 `root` 去运行 `docker`

同时， `Jenkins` 可能是通过 `Docker` 安装的，也可能是本地直接安装的。

## 通过 Docker 安装

现有两种方式解决：

### 方法一：暴力更改权限

在本机执行如下命令：

``` shell
$ sudo chmod -R 777 /var/run/docker.sock
```

接下来就能正常运行了，但这个风险太大了！

### 方法二：魔改 Jenkins Docker镜像

官方提供的 `Docker` 镜像里面不能用 `sudo` 命令，那我们基于官方镜像魔改一下，将 `sudo` 加入进去就可以了。

新建 `Dockerfile` 文件，写入如下内容

``` Dockerfile
FROM jenkins/jenkins:lts

USER root
RUN apt-get update \
    && apt-get install -y sudo \
    && rm -rf /var/lib/apt/lists/*
RUN echo "jenkins ALL=NOPASSWD: ALL" >> /etc/sudoers

USER jenkins
```

很简单，就是先切换到 `root` 用户，安装一下 `sudo` 这个软件包，之后将 `jenkins` 用户 `赋予sudo权限` ，然后再切换回 `jenkins` 用户。这样的魔改镜像对比官方镜像就是多了一个 `sudo` 功能，其他丝毫没动。

这个虽然比暴力更改权限好，但是也没有好很多，同样是将权限开放了，只不过一个是开放了文件的权限，一个是开放了应用的权限。

## 本地安装

本地安装时，最好的方法就是将 `jenkins` 加入到 `docker` 用户组

``` shell
$ sudo usermod -a -G docker jenkins     # 将用户加入用户组

$ sudo service jenkins restart     # 重启
```
