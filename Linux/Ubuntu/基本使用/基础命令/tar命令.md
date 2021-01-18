# Ubuntu tar 命令

tar 命令用来打包（注意：这里是打包，不是压缩！压缩只是附带的功能！可以只打包不压缩）

## 打包

``` shell
$ tar -cvf dist.tar ./dist/     # 将dist文件夹打包为dist.tar文件

$ tar -zcvf dist.tar.gz ./dist/     # 打包后以gzip压缩
```

## 解包

``` shell
$ tar -xf dist.tar     # 将dist.tar包解压到当前目录
$ tar -zxf dist.tar     # 将dist.tar包解压到当前目录（打包时采用了gzip压缩）
```

## 查看包中的内容

``` shell
$ tar -tvf dist.tar     # 查看dist.tar包中的文件信息
```
