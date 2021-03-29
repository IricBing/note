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

### 查看所有服务

``` shell
$ docker stack services <stack_name>

e.g.
$ docker stack services kunda
```

### 查看某个服务的任务

``` shell
$ docker service ps <service_name>

e.g.
$ docker service ps kunda_kunda-master
```

### 服务重启

``` shell
$ docker service update --force <service_name>

e.g.
$ docker service update --force kunda_kunda-master
```

### 停止其中某一项服务

``` shell
$ docker service update --replicas 0 <service_name>

e.g.
$ docker service update --replicas 0 kunda_kunda-master
```
