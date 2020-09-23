# Docker 安装 Kafka （内置Zookeeper）

因为Kafka需要依赖于Zookeeper，所以采用 `docker-compose` 来安装。

## Step1. 编写配置文件

新建 [docker-compose.yml](assets/files/docker-compose.yml)文件，写入以下内容：

``` yml
version: '2'
services:
  zookeeper:
    image: wurstmeister/zookeeper
    hostname: zookeeper
    restart: always
    ports:

      - "2181:2181"

    container_name: zookeeper
      
  kafka:
    image: wurstmeister/kafka
    hostname: kafka
    restart: always
    ports:

      - "9092:9092"

    environment:
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://:9092
      KAFKA_LISTENERS: PLAINTEXT://:9092
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
    depends_on:

      - zookeeper

    container_name: kafka
```

## Step2. 启动

``` shell
$ docker-compose up -d
```

## Step3. 增加本地DNS记录

kafka在连接的时候与其他的服务有区别，在局域网部署数据库时，我们只需要知道部署数据库那台服务器的内网ip+端口就能连接过去（当然，数据库需要提前开启bind限制），但是Kafka这里不行，这里要加上域名映射。

需要修改hosts文件，增加映射(ubuntu 版)

``` shell
$ sudo vim /etc/hosts
```

``` conf
127.0.0.1	localhost
127.0.1.1	iric-MS-7B89

127.0.0.1	kafka		# 这里是新添加的！！！

# The following lines are desirable for IPv6 capable hosts
::1     ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
```

## Step4. 连接

连接时，broker填写为：kafka:9092
