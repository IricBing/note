# Jenkins Docker 安装

[官方文档](https://github.com/jenkinsci/docker/blob/master/README.md)

一键安装命令：

``` shell
$ docker run -d --name jenkins -v jenkins_home:/var/jenkins_home -p 8080:8080 -p 50000:50000 jenkins/jenkins:lts
```
