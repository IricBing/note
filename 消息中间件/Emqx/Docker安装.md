# `Docker` 安装 `Emqx`

## 普通运行

```

$ docker pull emqx/emqx
$ docker run -d --name emqx --restart always -p 1883:1883 -p 8083:8083 -p 8883:8883 -p 8084:8084 -p 18083:18083 emqx/emqx
```

## `docker-compose` 运行

通过 `Docker Compose` 来运行的时候有两种场景，一种是**线上部署**的时候，一种是**本地开发**的时候，这两种在使用的时候配置是不同的。、

线上部署的时候一般 `docker compose` 中所有的服务都处在**同一个容器网络**下，仅仅是和宿主机之间通过暴露端口进行通信。

而在开发的时候，我们会进行一系列的配置，例如配置一下[http鉴权](鉴权.md)等，这个时候需要 `emqx` 与本地开发环境处在同一个网络下，因此需要**单独配置其网络环境**。

### 本地开发环境

```yml
version: '3.8'

volumes:
  vol-emqx-data:
    name: emqx-data
  vol-emqx-etc:
    name: emqx-etc
  vol-emqx-log:
    name: emqx-log

services:
  emqx:
    image: emqx/emqx:4.3.4
    container_name: emqx
    restart: always
    network_mode: host
    pid: host
    volumes:
      - vol-emqx-data:/opt/emqx/data
      - vol-emqx-etc:/opt/emqx/etc
      - vol-emqx-log:/opt/emqx/log
      - /etc/localtime:/etc/localtime:ro
    environment:
      EMQX_ALLOW_ANONYMOUS: 'false' # 禁止匿名连接
      EMQX_ACL_NOMATCH: deny  # ACL未命中时，拒绝 发布/订阅 操作
      EMQX_ENABLE_ACL_CACHE: 'off'  # 关闭ACL鉴权缓存
      EMQX_AUTH__HTTP__AUTH_REQ__URL: http://127.0.0.1:3000/emqx/auth
      EMQX_AUTH__HTTP__AUTH_REQ__METHOD: post
      EMQX_AUTH__HTTP__AUTH_REQ__CONTENT_TYPE: json
      EMQX_AUTH__HTTP__AUTH_REQ__PARAMS: client_id=%c,username=%u,password=%P,ip_address=%a,protocol=%r
      EMQX_AUTH__HTTP__SUPER_REQ__URL: http://127.0.0.1:3000/emqx/superuser
      EMQX_AUTH__HTTP__SUPER_REQ__METHOD: post
      EMQX_AUTH__HTTP__SUPER_REQ__CONTENT_TYPE: json
      EMQX_AUTH__HTTP__SUPER_REQ__PARAMS: client_id=%c,username=%u
      EMQX_AUTH__HTTP__ACL_REQ__URL: http://127.0.0.1:3000/emqx/acl
      EMQX_AUTH__HTTP__ACL_REQ__METHOD: get
      EMQX_AUTH__HTTP__ACL_REQ__CONTENT_TYPE: json
      EMQX_AUTH__HTTP__ACL_REQ__PARAMS: access=%A,username=%u,client_id=%c,ip_address=%a,topic=%t,mount_point=%m,protocol=%r
```

### 线上部署环境

```yml
version: '3.8'

volumes:
  vol-emqx-data:
    name: emqx-data
  vol-emqx-etc:
    name: emqx-etc
  vol-emqx-log:
    name: emqx-log

services:
  emqx:
    image: emqx/emqx:4.3.4
    container_name: emqx
    hostname: emqx
    restart: always
    ports:
      - 1883:1883
      - 18083:18083
      - 11883:11883
    volumes:
      - vol-emqx-data:/opt/emqx/data
      - vol-emqx-etc:/opt/emqx/etc
      - vol-emqx-log:/opt/emqx/log
      - /etc/localtime:/etc/localtime:ro
    # environment:
    #   EMQX_NAME: emqx
    #   EMQX_HOST: 127.0.0.1
```

## `docker-compose` 创建简单的 `static` 集群

创建[docker-compose.yaml](assets/files/docker-compose.yaml)文件

```yaml
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

```bash
$ docker-compose -p my_emqx up -d
```

查看集群

```bash
$ docker exec -it my_emqx_emqx1_1 sh -c "emqx_ctl cluster status"
Cluster status: #{running_nodes => ['emqx@node1.emqx.io','emqx@node2.emqx.io'],
                  stopped_nodes => []}

```
