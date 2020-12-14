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

使用reset来回退版本在效果上就像是删除了一些提交。

例如，在master分支上有如下提交：

``` mermaid
gitGraph:
options
{
    "nodeSpacing": 150,
    "nodeRadius": 10
}
end
commit
branch master
checkout master
commit
commit
commit
commit
```
