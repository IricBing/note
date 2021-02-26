# Jenkins NestJS 项目配置

## 环境准备

本笔记是在一个全新的系统上开始的，版本为： `2.263.1` 。安装方式为 `Docker` ，采用魔改版安装。[安装笔记](../Docker安装.md)

* [配置SSH key](../配置ssh_key.md)
* [集成私有Gitlab](../集成私有Gitlab.md)
* [配置nodejs环境](配置nodejs.md)

## 构建项目

如下图所示，进入 `job` 创建页面

![Jenkins创建job入口](assets/images/Jenkins创建job入口.png)

创建一个**自由风格**的项目。（以**透传云**的[tcp-broker](https://gitlab.lantsang.cn/xcloud/tcp-broker)项目为例）

![Jenkins创建自由风格项目](assets/images/Jenkins创建自由风格项目.png)
