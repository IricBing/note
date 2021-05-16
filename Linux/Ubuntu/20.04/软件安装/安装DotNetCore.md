# `Ubuntu 20.04` 安装 `. Net Core`

[官方文档](https://docs.microsoft.com/zh-cn/dotnet/core/install/linux-ubuntu#2004-)

## `Step1.` 将 `Microsoft` 包签名密钥添加到受信任密钥列表，并添加包存储库。

``` shell
$ wget https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
$ sudo dpkg -i packages-microsoft-prod.deb
```

## `Step2.` 安装 `SDK`

``` shell
$ sudo apt-get update; \
  sudo apt-get install -y apt-transport-https && \
  sudo apt-get update && \
  sudo apt-get install -y dotnet-sdk-5.0
```

> **提示**： 官方安装文档上面还有**安装运行时**的部分，安装官方文档的说法，**安装了SDK后就无需再安装运行时了！**

## `Step3.` 测试安装结果

``` shell
$ dotnet
Usage: dotnet [options]
Usage: dotnet [path-to-application]

Options:
  -h|--help         Display help.
  --info            Display .NET information.
  --list-sdks       Display the installed SDKs.
  --list-runtimes   Display the installed runtimes.

path-to-application:
  The path to an application .dll file to execute.
```
