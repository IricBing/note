# Ubuntu screen命令

## 普通用法

### 新建session

``` shell
$ screen -S session1  
```

以上命令表示新建一个名为 `session1` 的session并切换到这个session。

### 退出session（不删除）

当我们使用上一步的方式新建并切换到session1后，执行了一些操作，之后想退出这个session的时候， `不要直接关闭窗口!!!` ，使用快捷键 `Ctrl + A + Z` 退出，否则下次在进入这个session的时候需要使用 `-d` 强制命令！

### 退出session（删除）

在终端键入 `exit` 命令即可退出并删除session

### 查看session列表

``` shell
$ screen -ls
```

以上命令得到以下内容

``` shell
There are screens on:
	462669.log	(2020年10月12日 14时50分36秒)	(Detached)
	462160.master	(2020年10月12日 14时50分31秒)	(Attached)
	461668.session2	(2020年10月12日 14时50分26秒)	(Detached)
	461128.session1	(2020年10月12日 14时50分22秒)	(Detached)
4 Sockets in /run/screen/S-iric.
```

可以看出，有四个session，分别是： `log` , `master` , `session2` , `session1` , 前面的数字是对应session的 `pid` ，最后括号中的状态一般有两种 `Detached` (无占用) , `Attached` (有占用)，其中 `Detached` 状态可以直接切换进入， `Attached` 状态必须使用 `-d` 命令强制切换进入，这也是上面说的不要直接关闭窗口的原因，至于切换方法请往下看。

### 进入session

进入session可以通过名称或者pid进入

``` shell
$ screen -r [-d] [session|pid]
```

其中 `-d` 参数表示强制的意思，为什么会有 `-d` 参数请往上看。
**示例**

``` shell
$ screen -r log
$ screen -r -d 462669
```

### 删除session

* 通过kill pid 的方式来结束session

``` shell
$ kill 462669
```

* 删除所有session

``` shell
$ sudo killall screen
```

## 脚本用法

此为高级用法，不常用，特殊场景需要使用。

``` shell
$ screen -m -d test 	#新建/切换到test session，没有则新建session
$ screen -m -d -x 123.test -X stuff 'input your command'    #向123.test这个session发送命令，与终端无关。
```

## 附：批量退出命令

``` shell
$ screen -ls | grep -i serverStartedByProxy | cut -d. -f1 | tr -d [:blank:]| xargs kill
```
