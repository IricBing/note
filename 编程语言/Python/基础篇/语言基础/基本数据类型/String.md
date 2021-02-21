# `Python` 数据类型—— `String` （字符串）

`Python` 中字符串用**单引号** `'` 或**双引号** `"` 括起来，同时使用**反斜杠** `\` 来转义特殊字符。

``` python
var1='hello'
var2='world'
var3=var1+var2
```

`Python` 不支持单字符类型，单字符在 `Python` 中也是作为一个字符串使用。

`Python` 访问子字符串，可以使用方括号 `[]` 来截取字符串，字符串的截取的语法格式如下：

``` python
变量[头下标:尾下标]
```

索引值以 `0` 为开始值， `-1` 为从末尾的开始位置。

``` 

从后面索引：  -6   -5  -4  -3  -2  -1
从前面索引：   0   1   2   3   4   5
           +---+---+---+---+---+---+
           | a | b | c | d | e | f |
           +---+---+---+---+---+---+
从前面截取： :   1   2   3   4   5   :
从后面截取： :  -5  -4  -3  -2  -1   :
```

示例如下：

``` python
#!/usr/bin/python3.8

str='helloword'

print(str)  # 输出字符串    helloword
print(str[0:-1])    # 输出第一个到倒数第二个的所有字符  hellowor
print(str[0])   # 输出字符串的第一个字符    h
print(str[2:5]) # 输出从第三个开始到第五个的所有字符    llo
print(str[2:])  # 输出从第三个开始的所有字符    lloword
print(str*2)    # 输出字符串两次    hellowordhelloword
print(str+'test')   # 连接字符串    hellowordtest
```

`Python` 使用**反斜杠** `\` 转义特殊字符，如果不想让反斜杠发生转义，可以在字符串的前面添加一个 `r` ，表示**原始字符**。

``` python
print('c:\windows\nestjs')
# c:\windows
# estjs
print(r'c:\windows\nestjs')
# c:\windows\nestjs
```

另外，反斜杠 `\` 可以作为**续行符**，表示下一行是上一行的延续。也可以使用 `"""..."""` 或 `'''...'''` 跨越多行。

> 温馨提示： `Python` 中没有单独的字符类型，一个字符就是长度为1的字符串。
