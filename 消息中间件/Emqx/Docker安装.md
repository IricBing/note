# Docker安装Emqx

## 普通运行

``` 
$ docker pull emqx/emqx:v4.0.0
$ docker run -d --name emqx -p 1883:1883 -p 8083:8083 -p 8883:8883 -p 8084:8084 -p 18083:18083 emqx/emqx:v4.0.0
```

## docker-compose 创建简单的 static 集群

创建[docker-compose.yaml](assets/files/docker-compose.yaml)文件

``` yaml
version: '3'

services:
  emqx1:
    image: emqx/emqx:v4.0.0
    environment:

    - "EMQX_NAME=emqx"
    - "EMQX_HOST=node1.emqx.io"
    - "EMQX_CLUSTER__DISCOVERY=static"
    - "EMQX_CLUSTER__STATIC__SEEDS=emqx@node1.emqx.io, emqx@node2.emqx.io"

    healthcheck:
      test: ["CMD", "/opt/emqx/bin/emqx_ctl", "status"]
      interval: 5s
      timeout: 25s
      retries: 5
    networks:
      emqx-bridge:
        aliases:

        - node1.emqx.io

  emqx2:
    image: emqx/emqx:v4.0.0
    environment:

    - "EMQX_NAME=emqx"
    - "EMQX_HOST=node2.emqx.io"
    - "EMQX_CLUSTER__DISCOVERY=static"
    - "EMQX_CLUSTER__STATIC__SEEDS=emqx@node1.emqx.io, emqx@node2.emqx.io"

    healthcheck:
      test: ["CMD", "/opt/emqx/bin/emqx_ctl", "status"]
      interval: 5s
      timeout: 25s
      retries: 5
    networks:
      emqx-bridge:
        aliases:

        - node2.emqx.io

networks:
  emqx-bridge:
    driver: bridge
```

启动 docker-compose 集群

``` bash
$ docker-compose -p my_emqx up -d
```

查看集群

``` bash
$ docker exec -it my_emqx_emqx1_1 sh -c "emqx_ctl cluster status"
Cluster status: #{running_nodes => ['emqx@node1.emqx.io','emqx@node2.emqx.io'],
                  stopped_nodes => []}

```
