# Docker 安装单机版 Redis 数据库

``` shell
$ docker run -d --name redis --restart=always --log-driver json-file --log-opt max-size=100m --log-opt max-file=2 -p 6379:6379 -v redis-conf:/etc/redis/redis.conf -v redis-data:/data redis:6-alpine
```
