# Ubuntu 20.04 安装Kafka

kafka需要java环境，请先安装[openjdk](安装OpenJDK.md)

## Step1. 下载

[官网下载地址](https://kafka.apache.org/downloads)

## Step2. 解压

得到一下文件结构

``` shell
$ tree -L 1

kafka_2.12-2.4.1
├── bin
├── config
├── libs
├── LICENSE
├── NOTICE
└── site-docs
```

## Step3. 建立log和logs文件夹

## Step4. 修改config/server.properties文件

``` conf
broker.id=1

log.dirs=./log/logs-1
```

保存文件

## Step5. 启动Zookeeper(可选)

kafka软件包内置[Zookeeper](../../../../消息中间件/Kafka/Zookeeper/README.md), 如果不使用本机不想单独装Zookeeper，可使用以下命令来启动内置Zookeeper

``` shell
$ bin/zookeeper-server-start.sh -daemon config/zookeeper.properties
```

## Step5. 启动

``` shell
$ bin/kafka-server-start.sh config/server.properties
```
