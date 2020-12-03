# Ubuntu apt 命令走代理

语法：

``` shell
$ sudo apt -o Acquire::https::proxy="http://127.0.0.1:1088/" -o Acquire::http::proxy="http://127.0.0.1:1088/" update
```
