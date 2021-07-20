# `Docker` 安装 `Gitlab` （基于 `Ubuntu 20.04` ）

> 提示：本笔记安装的是社区版本

* [官方安装文档](https://docs.gitlab.com/ee/install/docker.html#install-gitlab-using-docker-engine)
* [社区版官方仓库地址](https://registry.hub.docker.com/r/gitlab/gitlab-ce/)
* [企业版官方仓库地址](https://hub.docker.com/r/gitlab/gitlab-ee)

官方文档要求先建立 `$GITLAB_HOME` 环境变量，指向地址为： `/srv/gitlab`

根据你的终端类型修改 `.zshrc` 或者 `.bashrc` 文件，写入如下配置:

```zsh
# Gitlab 环境变量
export GITLAB_HOME=/srv/gitlab
```

接下来从新加载配置文件，并测试环境变量是否配置成功了

```shell
# 重载zsh配置文件
$ source ~/.zshrc

# 输出 $GITLAB_HOME 环境变量的值，看看是否配置成功了
$ echo $GITLAB_HOME
/srv/gitlab
```

> 接收到如上输出即表示配置成功了。

一键运行命令：

```shell
$ sudo docker run --detach \
    --hostname gitlab.virtualbing.cn \
    --env GITLAB_OMNIBUS_CONFIG="external_url 'http://gitlab.virtualbing.cn/'; gitlab_rails['lfs_enabled'] = true;" \
    --publish 8443:443 --publish 8080:80 --publish 2224:22 \
    --name gitlab \
    --restart always \
    --volume $GITLAB_HOME/config:/etc/gitlab \
    --volume $GITLAB_HOME/logs:/var/log/gitlab \
    --volume $GITLAB_HOME/data:/var/opt/gitlab \
    gitlab/gitlab-ce:latest
```
