# `Docker` 安装 `ElasticSearch`

一键运行命令：

```shell
$ docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:latest
```
