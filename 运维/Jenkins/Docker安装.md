# Jenkins Docker 安装

[官方文档](https://github.com/jenkinsci/docker/blob/master/README.md)

一键安装命令：

``` shell
$ docker run -d --name jenkins -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock -v $(which docker):/usr/bin/docker jenkins/jenkins:lts    # 官方版

$ docker run -d --name jenkins -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock -v $(which docker):/usr/bin/docker registry.cn-hangzhou.aliyuncs.com/lantsang/jenkins:lts     # 个人魔改版
```

**官方版**和**个人魔改版**区别：

因为本人想通过 `Jenkins` 来构建 `Docker` 镜像，并发布到阿里云镜像仓库，但是在 `Jenkins` 中调用 `Docker` 会遇到一些问题，详细信息参考：[Jenkins中使用Docker](使用Docker.md)
