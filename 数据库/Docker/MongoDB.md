# Docker 运行MongoDB

## 参考资料
- [Docker MongoDB 部署](https://www.jianshu.com/p/6fdb2bcb4b43) (主要参考)
- [利用 Docker 运行 MongoDB](https://brickyang.github.io/2017/03/15/%E5%88%A9%E7%94%A8-Docker-%E8%BF%90%E8%A1%8C-MongoDB/)

## Step1 获取官方镜像

```shell
$ docker pull mongo
```

## Step2 启动容器
```shell
$ docker run -d -p 27017:27017 -v $PWD/mongo_docker_data:/data/db --name mongodb mongo  #无需验证
	
$ docker run -d -p 27017:27017 -v $PWD/mongo_docker_data:/data/db --name mongodb mongo --auth   #带用户名密码验证
```

## Step3 进入容器
```shell
$ docker exec -it mongodb mongo admin
```

## Step4 以管理员身份登录
```shell
docker exec -it monggodb mongo -u root -p 123456 --authenticationDatabase admin
```