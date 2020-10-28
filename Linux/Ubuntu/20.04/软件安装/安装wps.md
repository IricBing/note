# Ubuntu 20.04 安装WPS

## Step1 下载deb安装包

[官网下载地址](https://linux.wps.cn/)

## Step2 安装

双击安装，或者使用命令：

``` shell
$ sudo dpkg -i wps-office_11.1.0.9711_amd64.deb 
```

## Step3 缺少字体解决办法

下载[字体压缩包](./assets/files/wps_symbol_fonts.zip)。并解压。

依次运行以下命令：

``` shell
$ sudo cp * /usr/share/fonts    #复制字体文件到Linux系统中的/usr/share/fonts文件夹中
$ sudo mkfontscale      # 生成字体的索引信息
$ sudo mkfontdir        # 生成字体的索引信息
$ sudo fc-cache     # 更新字体缓存
```

重启即可。
