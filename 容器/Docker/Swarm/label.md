# Docker Swarm 节点标签

## 作用

**多节点Swarm集群**下，每个节点的配置可能不同（CPU、内存、磁盘等），部署的服务也不尽相同，可能有web静态页面服务，计划任务服务，http server服务等等。当这些服务以 `Service` 或 `Stack` 的形式部署到集群时，如不进行其他配置，则**默认会随机分配到各个节点**。大多数情况下，我们并不想让他随机分配，例如：部署数据库的容器，我们更希望它运行在磁盘容量更大的服务器上。

这个时候就要用到 `节点标签` 这个功能了。显而易见，节点标签即给集群中的节点（服务器）打上标签，然后在部署服务的时候指定这个服务要在有那个标签（或者没有那个标签）的节点上运行，这就达到了指定容器运行节点的需求。

## 用法

### 添加标签

命令格式：

``` shell
$ docker node update --label-add [标签名称]=[标签值] [节点名称(HOSTNAME)]
```

示例：

``` shell
$ docker node update --label-add role=gateway node1
```

查看结果：

``` shell
$ docker node inspect node1
[
    {
        "ID": "sxkwoaik9bbj2oihxqrxxjxtc",
        "Version": {
            "Index": 33
        },
        "CreatedAt": "2020-12-25T11:58:21.941243809Z",
        "UpdatedAt": "2020-12-25T13:11:04.166963485Z",
        "Spec": {
            "Labels": {
                "role": "gateway"   # 这里就是添加结果
            },
            "Role": "manager",
            "Availability": "active"
        },

```

### 删除标签

命令格式：

``` shell
$ docker node update --label-rm [标签名称] [节点名称(HOSTNAME)]
```

示例：

``` shell
$ docker node update --label-rm role node1
```
