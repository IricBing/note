# Docker 安装MongoDB单机版

## Step1. 获取官方镜像

```shell
$ docker pull mongo
```

## Step2. 启动容器

```shell
# 无需验证
$ docker run -d -p 27017:27017 -v $PWD/mongo_docker_data:/data/db -v /etc/localtime:/etc/localtime:ro --name mongodb mongo --wiredTigerCacheSizeGB 2
	
# 需要验证
$ docker run -d -p 27017:27017 -v $PWD/mongo_docker_data:/data/db -v /etc/localtime:/etc/localtime:ro --name mongodb mongo --auth
```

> 提示： `--wiredTigerCacheSizeGB 2` 表示 `MongoDB` 所能采用的最大内存是 `2GB`

## Step3. 进入容器

```shell
$ docker exec -it mongodb mongo admin
```

## Step4. 以管理员身份登录

```shell
$ docker exec -it monggodb mongo -u root -p m5tgb6tfc%^ --authenticationDatabase admin
```
