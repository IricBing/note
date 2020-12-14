# Git 回滚代码

回滚代码和核心命令有两个，一个是 `reset` ，一个是 `revert` ，从术语上将， `reset` 是用来 `回退` 版本， `revert` 是用来 `还原` 某次或某几次提交。

## reset基本使用

常规流程：

``` mermaid
graph TD;
    A["$ git log 查看分支历史，确认要回退的版本"] --> B["$ git reset --hard commit_id 进行版本回退"];
    B --> C["$ git push origin branch_name --force 强制推送到远程分支"]
```

`注意：` **保护分支是不允许强制推送的**，尽管你是项目 `owner` 也不行！通常 `master` 和 `development` 等分支为保护分支，要想通过 `reset` 来回滚，需要先将其 `unprotect` ，之后再强制提交。

上述流程的**简写形式**为：

``` shell
$ git reset --hard HEAD^    # 回到上个版本
$ git reset --hard HEAD^^   # 回到上上个版本
```

### reset 对提交记录的影响

使用 `reset` 来回退版本在效果上就像是删除了一些提交。

例如，在 `master` 分支上有如下提交：

``` 

42eae13 (HEAD -> master) 第四次修改
97ea0f9 第三次修改
e50b7c2 第二次修改
3a52650 第一次修改
```

如果发现，在第四次修改有错误，使用 `reset` 命令回滚到第三次修改，这个时候提交历史变成了：

``` 

97ea0f9 (HEAD -> master) 第三次修改
e50b7c2 第二次修改
3a52650 第一次修改
```

相当于我们删除了第四次修改的提交记录，（这里并不是物理删除，还是可以找回来的，具体命令可以查看[git reflog](../reflog/README.md)）

## revert 基本使用

假设在master分支上有如下提交：

``` 

42eae13 (HEAD -> master) 第四次修改
97ea0f9 第三次修改
e50b7c2 第二次修改
3a52650 第一次修改
```

第四次提交有一些问题，但是还有其他代码是不可放弃的，我们就需要用 `revert` 指令来保留第四次代码，同时恢复第三次修改。

``` shell
$ git revert -n 97ea0f9
$ git commit -m "恢复第三次修改"
```

此时的提交历史会变成：

``` shell
33b8b30 (HEAD -> master) Revert "恢复第三次修改"
42eae13 第四次修改
97ea0f9 第三次修改
e50b7c2 第二次修改
3a52650 第一次修改
```

实际上， `Git` 把第三次修改从提交中剔除(还原)了，还保留了第四次修改，并且产生了新的 `commit_id` 。
