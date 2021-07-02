# `Ubuntu 20.04` 下 `JetBrains` 全家桶卡死

## 问题原因

是因为**搜狗输入法**导致的，具体请查看 `Ubuntu` 中文论坛中的帖子：[输入法切换至fcitx导致IDEA进程卡死问题](https://forum.ubuntu.com.cn/viewtopic.php?f=88&t=491462)

## 卡死后临时处理

```shell
$ sudo ps -ef |grep idea

$ sudo kill -9 <pid>
```

## 解决办法

切换到**百度输入法 `Linux` 版**

> PS: 内心是不愿意的。。。
