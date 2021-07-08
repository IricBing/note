# `C` 语言编译篇—— `gcc`

## 编译步骤

`Step1.` **预处理**，生成预编译文件—— `.i文件`

```shell
$ gcc –E hello.c –o hello.i
```

`Step2.` 编译，生成汇编文件—— `.s文件`

```shell
$ gcc –S hello.i –o hello.s
```

`Step3.` 汇编，生成目标文件—— `.o文件`

```shell
$ gcc –c hello.s –o hello.o
```

`Step4.` 链接，生成 `可执行文件`

```shell
$ gcc hello.o –o hello
```

> `PS:` 日常使用中我们不会这样一步一步的编译，但是有时候，进行调试，可能会用到某个步骤哦！
