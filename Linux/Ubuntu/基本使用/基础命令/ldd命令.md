# Ubuntu `ldd` 命令

## 用途

用来查看程序运行所需要的共享库。

## 原理

`ldd` 不是个可执行程式，而只是个 `shell` 脚本。 `ldd` 显示可执行模块的 `dependency` 的工作原理，其实质是通过 `ld-linux.so` （ `elf` 动态库的装载器）来实现的。 `ld-linux.so` 模块会先于 `executable` 模块程式工作，并获得控制权，因此当上述的那些环境变量被设置时， `ld-linux.so` 选择了显示可执行模块的 `dependency` 。

## 用法示例

``` shell
$ ldd /usr/share/sangfor/EasyConnect/EasyConnect | grep pango                                  
	libpangocairo-1.0.so.0 => /lib/x86_64-linux-gnu/libpangocairo-1.0.so.0 (0x00007fe835195000)
	libpango-1.0.so.0 => /lib/x86_64-linux-gnu/libpango-1.0.so.0 (0x00007fe834ffb000)
	libpangoft2-1.0.so.0 => /lib/x86_64-linux-gnu/libpangoft2-1.0.so.0 (0x00007fe833351000)
```
