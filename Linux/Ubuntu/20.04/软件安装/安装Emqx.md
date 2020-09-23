# Ubuntu 20.04 安装Emqx

[Emqx简介](../../../../消息中间件/Emqx/简介.md)

`注意：` 直接参考[官网安装](https://docs.emqx.net/broker/latest/cn/getting-started/install.html#shell)即可！

## Step1. 下载安装包

[下载地址](https://www.emqx.io/cn/downloads#broker)

本文介绍 `zip版安装运行方式` ，deb方式与Windows无异，双击安装即可，不做赘述。

## Step2. 解压

解压，得到如下目录结构：

``` 
emqx
├── bin
├── data
├── erts-10.7.1
├── etc
├── lib
├── log
└── releases
```

## Step3. 启动程序

``` bash
$ ./bin/emqx start                                                                    
EMQ X Broker v4.1.4 is started successfully!
```

查看状态

``` bash
$ ./bin/emqx_ctl status                                                              
Node 'emqx@127.0.0.1' is started
emqx 4.1.4 is runnin
```

## Step4. 停止程序

```bash 
$ ./bin/emqx stop                                                                     
ok
```

## Step5. 卸载

直接删除 EMQ X 目录即可
