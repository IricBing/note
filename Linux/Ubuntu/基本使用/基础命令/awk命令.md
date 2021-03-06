# Linux `awk` 命令

`awk` 是处理文本文件的一个应用程序，几乎所有 `Linux` 系统都自带这个程序。

它依次处理文件的每一行，并读取里面的每一个字段。对于日志、CSV 那样的每行格式相同的文本文件， `awk` 可能是最方便的工具。

`awk` 其实不仅仅是工具软件，还是一种**编程语言**！

## 语法

``` shell
$ awk [选项参数] 'script' var=value file(s)
or
$ awk [选项参数] -f scriptfile var=value file(s)
```

选项参数说明：

* `-F` fs or `--field-separator` fs

  指定输入文件折分隔符， `fs` 是一个**字符串**或者是一个**正则表达式**，如 `-F:` 。

* `-v` var=value or `--asign` var=value

  赋值一个用户定义**变量**。

* `-f` scripfile or `--file` scriptfile

  从**脚本文件**中读取 `awk` 命令。

* `-mf` nnn and `-mr` nnn

  对 `nnn` 值设置内在限制， `-mf` 选项限制分配给 `nnn` 的**最大块数目**； `-mr` 选项限制记录的**最大数目**。这两个功能是 `Bell` 实验室版 `awk` 的扩展功能，在标准 `awk` 中**不适用**。

* `-W` compact or `--compat`,  `-W` traditional or `--traditional`

  在**兼容模式**下运行 `awk` 。所有 `awk` 的行为和**标准**的 `awk` 完全一样，所有的 `awk` 扩展都被忽略。

* `-W` copyleft or `--copyleft`,  `-W` copyright or `--copyright`

  打印简短的**版权信息**。

* `-W` help or `--help`,  `-W` usage or `--usage`

  打印全部 `awk` 选项和每个选项的**简短说明**。

* `-W` lint or `--lint`

  打印不能向传统 `unix` 平台移植的结构的警告。

* `-W` lint-old or `--lint-old`

  打印关于不能向传统 `unix` 平台移植的结构的警告。

* `-W` posix

  打开**兼容模式**。但有以下限制，不识别： `/x` 、 `函数关键字` 、 `func` 、 `换码序列` 以及当fs是一个空格时，将新行作为一个 `域分隔符` ；操作符 `**` 和 `**=` 不能代替 `^` 和 `^=` ； `fflush` 无效。

* `-W` re-interval or `--re-inerval`

  允许间隔正则表达式的使用，参考( `grep` 中的 `Posix` 字符类)，如括号表达式 `[[:alpha:]]` 。

* `-W` source program-text or `--source` program-text

  使用 `program-text` 作为源代码，可与 `-f` 命令混用。

* `-W` version or `--version`

  打印 `bug` 报告信息的版本。

## 运算符

|运算符|描述|
|-----|-----|
| `=`  `+=`  `-=`  `*=`  `/=`  `%=`  `^=`  `**=` |赋值|
| `?:` |C条件表达式|
| `\|\|` |逻辑或|
| `&&` |逻辑与|
| `~` 和 `!~` |匹配正则表达式和不匹配正则表达式|
| `<`  `<=`  `>`  `>=`  `!=`  `==` |关系运算符|
|空格|连接|
| `+`  `-` |加，减|
| `*`  `/`  `%` |乘，除与求余|
| `+`  `-`  `!` |一元加，减和逻辑非|
| `^`  `***` |求幂|
| `++`  `--` |增加或减少，作为前缀或后缀|
| `$` |字段引用|
| `in` |数组成员|
