# Docker Stack 命令

## 功能

`docker stack` 命令可以理解为 `docker-compose` 的集群版本

## 常用命令

### 部署集群

``` shell
$ docker stack up -c [compose-file] --with-registry-auth kunda [stack 名称]
$ docker stack deploy -c [compose-file] --with-registry-auth kunda [stack 名称]
```

`注意：` **--with-registry-auth kunda**参数非常有用，如果不加这个参数，则启动集群时不会从私有仓库下载镜像！

示例：

``` shell
$ docker stack deploy -c docker-stack.yml --with-registry-auth kunda
```
